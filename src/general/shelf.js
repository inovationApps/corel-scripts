
const getDataSetFromElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return null;
  }
  return element.dataset;
};

const fetchProducts = async () => {
  const { skuid, itemsfetched } = getDataSetFromElement('corel_container');
  console.log(skuid, itemsfetched);
  const options = {
    'method': 'GET',
    // 'mode': 'no-cors',
    'headers': {
      'Authorization': `Bearer ${tenantToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

  try {
    const response = await fetch(`${baseUrl}v1/skus/${skuid}?batchSize=${itemsfetched}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log(result);

    const promises = await Promise.allSettled([
      result
    ]);

    return promises;
  } catch (error) {
    console.error('Fetch error:', error);
  }


};

const productClickHandler = (sku,link,origin) => {
  saveClick(link, origin);
}

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

const renderShelf = (data) => {
  const { imgsize } = getDataSetFromElement('corel_container');

  const container = document.getElementById('corel_container');
  const shelfWrapper = document.createElement('div');
  shelfWrapper.className = 'shelfWrapper';

  const shelfTitle = document.createElement('h4');
  shelfTitle.className = 'shelfTitle';
  shelfTitle.textContent = 'Recomendados para você';

  const slider = document.createElement('div');
  slider.className = 'sliderContainer';

  const prevButton = document.createElement('button');
  prevButton.className = 'prevButton';
  prevButton.innerHTML = '&#10094;';

  const nextButton = document.createElement('button');
  nextButton.className = 'nextButton';
  nextButton.innerHTML = '&#10095;';

  shelfWrapper.appendChild(prevButton);
  shelfWrapper.appendChild(nextButton);

  data.forEach((el, index) => {
    const item = document.createElement('div');
    item.className = 'shelfItem';
    item.setAttribute('sku_id', el?.externalId);
    item.setAttribute('product_id', el?.externalProductId);
    item.addEventListener('click', () => {
      productClickHandler(el?.externalId, el?.uri, 'upsell');//precisa de origin na api
      // sendConversion(el?.sku_id, pageSkuId, index, el?.origin);
    });
    item.addEventListener('auxclick', (e) => {
      if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.metaKey))) {
        productClickHandler(el?.externalId, el?.uri, 'upsell');//precisa de origin na api
      }
    });

    item.addEventListener('contextmenu', (e) => {
        productClickHandler(el?.externalId, el?.uri, 'upsell');//precisa de origin na api
    });

    const link = document.createElement('a');
    link.className = 'shelfItemLink';
    link.href = el?.uri;

    const img = document.createElement('img');
    img.className = 'shelfItemImage';
    img.src = el?.imageUrl?.replace(/\/ids\/(\d+)(-\d+-\d+)?/, (match, p1, p2) => `/ids/${p1}-${imgsize}`);
    img.alt = el?.name;

    const name = document.createElement('p');
    name.className = 'shelfItemName';
    name.textContent = el?.name;

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(link);

    slider.appendChild(item);
  });

  shelfWrapper.appendChild(shelfTitle);
  shelfWrapper.appendChild(slider);
  container.appendChild(shelfWrapper);

  // const initializeSlider = new Slider();
};
const initializeSlider = () => {
  const margin = parseInt(getDataSetFromElement('corel_container')?.margin, 10);
  const itemsperpage = parseInt(getDataSetFromElement('corel_container')?.itemsperpage, 10);

  const slider = document.querySelector('.sliderContainer');
  const items = slider.querySelectorAll('.shelfItem');
  const totalItems = items.length;
  let currentPage = 0;

  const styleSlider = (sliderElement) => {
    const containerWidth = sliderElement.parentElement.clientWidth;
    const itemWidth = (containerWidth / itemsperpage) - margin;
    items.forEach(item => {
      item.style.width = `${itemWidth}px`;
      item.style.marginRight = `${margin}px`;
    });
    sliderElement.style.width = `${(itemWidth + margin) * totalItems}px`;
  };

  const updateSlider = () => {
    const itemWidth = items[0].offsetWidth + margin;
    const offset = -currentPage * itemWidth * itemsperpage;
    slider.style.transform = `translateX(${offset}px)`;
    updateDots();
  };

  const createDots = () => {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dotsContainer';
    const totalPages = Math.ceil(totalItems / itemsperpage);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => {
        currentPage = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
    slider.parentElement.appendChild(dotsContainer);
  };

  const updateDots = () => {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.className = (index === currentPage) ? 'dot active' : 'dot';
    });
  };

  const moveSlide = (direction) => {
    const totalPages = Math.ceil(totalItems / itemsperpage);
    currentPage = (currentPage + direction + totalPages) % totalPages;
    updateSlider();
  };

  document.querySelector('.prevButton').addEventListener('click', () => moveSlide(-1));
  document.querySelector('.nextButton').addEventListener('click', () => moveSlide(1));

  styleSlider(slider);
  createDots();
  updateSlider();
};
