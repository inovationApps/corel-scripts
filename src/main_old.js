function main() {
  console.log('hello henry');

  // const BASE_URL = 'jorgebischoff.cuboapp.net'; // vai ser passada a id no script
  const BASE_URL = 'http://localhost:80';
  const rendered_items_quantity = 15;
  const show_sku_variations = false;
  const items_by_page = 4;
  const categoryIds = '6-8-11'; // Replace with actual category IDs
  
  let productName = ''; // Replace with actual product name

  let data = [];

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/scripts/upsell/${categoryIds}`);
    const result = await response.json();

    const removeSameProduct = result?.filter(el => el.product_name !== productName);
    const upsellArray = removeSameProduct?.map(el => { el.origin = ['upsell']; return el; });

    const maxLength = Math.max(
      upsellArray?.length || 0
    );

    const bigArray = [];

    for (let i = 0; i < maxLength; i++) {
      if (i < upsellArray?.length) {
        let existingElement = false;
        if (show_sku_variations) {
          existingElement = bigArray.some(el => el?.sku_id === upsellArray[i]?.sku_id);
        } else {
          existingElement = bigArray.some(el => el?.product_name === upsellArray[i]?.product_name);
        }

        if (upsellArray[i] && !existingElement) {
          bigArray.push(upsellArray[i]);
        } else if (existingElement) {
          bigArray.find(el => el?.sku_id === upsellArray[i]?.sku_id)?.origin.push('upsell');
        }
      }
    }

    data = bigArray.slice(0, rendered_items_quantity);
    renderShelf();
  };

  const renderShelf = () => {
    const container = document.getElementById('corel_container');
    const shelfWrapper = document.createElement('div');
    shelfWrapper.className = 'shelfWrapper';

    const shelfTitle = document.createElement('h4');
    shelfTitle.className = 'shelfTitle';
    shelfTitle.textContent = 'Recomendados para você';

    const slider = document.createElement('div');
    slider.className = 'slider';

    const prevButton = document.createElement('button');
    prevButton.className = 'prev';
    prevButton.innerHTML = '&#10094;';
    prevButton.onclick = () => initializeSlider.moveSlide(-1);

    const nextButton = document.createElement('button');
    nextButton.className = 'next';
    nextButton.innerHTML = '&#10095;';
    nextButton.onclick = () => initializeSlider.moveSlide(1);

    shelfWrapper.appendChild(prevButton);
    shelfWrapper.appendChild(nextButton);

    data.forEach((el, index) => {
      const item = document.createElement('div');
      item.className = 'shelfItem';
      item.setAttribute('sku_id', el?.sku_id);
      item.addEventListener('click', () => {
        console.log("click");
        productClickHandler(el?.sku_id, el?.detail_url, el?.origin);
        sendConversion(el?.sku_id, pageSkuId, index, el?.origin);
      });

      const img = document.createElement('img');
      img.className = 'shelfItemImage';
      img.src = el?.image_url?.replace(/\/ids\/(\d+)(-\d+-\d+)?/, (match, p1, p2) => `/ids/${p1}-250-250`);
      img.alt = el?.product_name;

      const name = document.createElement('p');
      name.className = 'shelfItemName';
      name.textContent = el?.product_name;

      item.appendChild(img);
      item.appendChild(name);

      slider.appendChild(item);
    });

    shelfWrapper.appendChild(shelfTitle);
    shelfWrapper.appendChild(slider);
    container.appendChild(shelfWrapper);

    const initializeSlider = new Slider();
  };

  class Slider {
    constructor() {
      this.currentIndex = 0;
      this.slides = document.querySelectorAll('.shelfItem');
      this.totalSlides = this.slides.length;
      this.itemsPerPage = this.getItemsPerPage();
      this.updateSliderPosition();
      window.addEventListener('resize', () => {
        this.itemsPerPage = this.getItemsPerPage();
        this.updateSliderPosition();
      });
    }

    getItemsPerPage() {
      return window.innerWidth <= 768 ? 2 : 4;
    }

    moveSlide(direction) {
      this.currentIndex += direction * this.itemsPerPage;

      if (this.currentIndex < 0) {
        this.currentIndex = this.totalSlides - this.itemsPerPage;
      } else if (this.currentIndex >= this.totalSlides) {
        this.currentIndex = 0;
      }

      this.updateSliderPosition();
    }

    updateSliderPosition() {
      const slider = document.querySelector('.slider');
      const offset = -this.currentIndex * (100 / this.itemsPerPage);
      slider.style.transform = `translateX(${offset}%)`;
    }
  }

  const productClickHandler = (sku_id, link, origin) => {
    sendClick(sku_id);
    saveClick(link, origin);
  };

  const sendClick = (sku_id) => {
    const full_url = `${BASE_URL}/scripts/upsell/click/${sku_id}`;
    fetch(full_url, { method: "GET", cache: "no-cache", keepalive: true });
  };

  const saveClick = (link, origin) => {
    const presentUrl = window?.location?.pathname;
    const futureUrl = link;
    const urlsObj = {
      'originUrl': presentUrl,
      'targetUrl': futureUrl,
      'origin': origin,
      'readCount': 0
    };

    let body;
    const currentData = localStorage.getItem('currentShelfInteractions');
    if (currentData) {
      const currentDataJson = JSON.parse(currentData);
      currentDataJson.push(urlsObj);
      body = currentDataJson;
    } else {
      body = [urlsObj];
    }

    localStorage.setItem('currentShelfInteractions', JSON.stringify(body));
  };

  const sendConversion = (sku_id, pageSkuId, shelfIndex, origin) => {
    console.log(origin);
    marketingTagSender({ pageSkuId: pageSkuId, skuId: sku_id, origin: origin, position: shelfIndex + 1 });
  };

  

  const createStyleTag = () => {
    fetch("shelf_styles.css") // Replace with your CSS file path
      .then(response => response.text())
      .then(css => {
        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
      })
      .catch(error => console.error("Error loading CSS:", error));
  };

  document.addEventListener('DOMContentLoaded', () => {
    // createStyleTag();
    fetchData(); // Call to fetch the data when the page loads
  });
}
main();