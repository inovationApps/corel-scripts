
const getDataSetFromElement = (elementId) => {
  const element = document.querySelector(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return null;
  }
  return element.dataset;
};

const fetchProducts = async () => {
  const { skuid, itemsfetched } = getDataSetFromElement('#corel_container');

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

    const promises = await Promise.allSettled([
      result
    ]);

    return promises;
  } catch (error) {
    console.error('Fetch error:', error);
  }


};

const observerHandler = () => {
  const items = document.querySelectorAll('.shelfItem');

  if (!items) return;

  items.forEach((item, index) => {
    if (item) {
      const observer = productViewHandler(item.getAttribute('sku_id'));
      observer.observe(item);
      return observer;
    }
    return null;
  });
};

const productViewHandler = (sku_id) => {

  let hasTriggered = false;
  const sendView = async () => {
    sendInteraction(sku_id, 0);
    sessionHandler('shelfSession');
  };

  return new IntersectionObserver((entries, observer) => {
    if (entries.find((x) => x.isIntersecting)?.isIntersecting == true && !hasTriggered) {

      sendView();
      hasTriggered = true;
      observer.disconnect();
    }
  }, { threshold: [0] });
};


const productClickHandler = (pageSkuId, sku, link, origin, position) => {
  saveClick(link, origin);
  sendClick(sku);
  obj = {
    "pageSkuId": pageSkuId,
    "skuId": sku,
    "origin": origin,
    "position": position
  };
  sendInteractionsToOrderVtex(JSON.stringify(obj));
};

const sendInteraction = async (sku, eventType) => {
  const options = {
    'method': 'POST',
    'keepalive': true,
    'headers': {
      'Authorization': `Bearer ${tenantToken}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    'body': JSON.stringify({
      "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      // "tenantId": tenantToken,
      "externalId": sku,
      "eventType": eventType
    })
  };

  try {
    const response = await fetch(`${baseUrl}v1/sku-events`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const sendClick = async (sku) => {
  sendInteraction(sku, 1);
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

function verifyImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

const renderShelf = async (data) => {
  const { skuid, imgsize } = getDataSetFromElement('#corel_container');

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

  let index = 0;
  for (const el of data) {
    const item = document.createElement('div');
    item.className = 'shelfItem';
    item.setAttribute('sku_id', el?.externalId);
    item.setAttribute('product_id', el?.externalProductId);
    item.addEventListener('click', () => {
      productClickHandler(skuid, el?.externalId, el?.uri, '', index + 1);//precisa de origin na api
      // sendConversion(el?.sku_id, pageSkuId, index, el?.origin);
    });
    item.addEventListener('auxclick', (e) => {
      if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.metaKey))) {
        productClickHandler(skuid, el?.externalId, el?.uri, '', index + 1);//precisa de origin na api
      }
    });

    item.addEventListener('contextmenu', (e) => {
      productClickHandler(skuid, el?.externalId, el?.uri, '', index + 1);//precisa de origin na api
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
    if (await verifyImage(img.src)) {
      console.log('true');
      slider.appendChild(item);
    } else {
      console.log('false');
    }
    index++;
  };

  shelfWrapper.appendChild(shelfTitle);
  shelfWrapper.appendChild(slider);
  container.appendChild(shelfWrapper);

  // const initializeSlider = new Slider();
};

initializeSlider = () => {
  const margin = parseInt(getDataSetFromElement('#corel_container')?.margin, 10);
  const itemsperpage = parseInt(getDataSetFromElement('#corel_container')?.itemsperpage, 10);

  const slider = document.querySelector('.sliderContainer');
  const items = slider.querySelectorAll('.shelfItem');
  const totalItems = items.length;
  let currentPage = 0;
  let hideTimeouts = []; // Store timeouts to clear them later

  const styleSlider = (sliderElement, hideTimeouts) => {
    const containerWidth = Math.floor(sliderElement.parentElement.clientWidth);
    const adjustedContainerWidth = Math.floor(containerWidth / itemsperpage) * itemsperpage;
    const itemWidth = Math.floor(adjustedContainerWidth / itemsperpage) - margin;


    // Clear any existing timeouts before processing items
    if (hideTimeouts.length > 0) {
      hideTimeouts.forEach(timeout => clearTimeout(timeout));
      // hideTimeouts;
    }

    items.forEach((item, index) => {
      item.style.width = `${itemWidth}px`;
      item.style.marginRight = `${margin}px`;

      // Hide items that overflow
      if (index >= itemsperpage * (currentPage + 1)) {
        hideTimeouts.push(setTimeout(() => {
          item.style.display = 'none';
        }, 500));
      } else {
        item.style.display = 'block';
      }
    });

    const totalWidth = (itemWidth + margin) * totalItems;
    sliderElement.style.width = `${totalWidth}px`;
  };

  const updateSlider = () => {
    const itemWidth = items[0].offsetWidth + margin;
    const offset = -currentPage * itemWidth * itemsperpage;
    slider.style.transform = `translateX(${offset}px)`;
    updateDots();
    styleSlider(slider, hideTimeouts); // Ensure items are hidden/shown correctly on update
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

  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', () => {
    const threshold = 50; // Minimum distance to be considered a swipe
    if (startX - endX > threshold) {
      moveSlide(1);
    } else if (endX - startX > threshold) {
      moveSlide(-1);
    }
  });

  const resizeObserver = new ResizeObserver(() => {
    styleSlider(slider, hideTimeouts);
    updateSlider();
  });

  resizeObserver.observe(slider.parentElement);

  styleSlider(slider, hideTimeouts);
  createDots();
  updateSlider();
};