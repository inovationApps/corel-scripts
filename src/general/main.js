
// const baseUrl = 'http://localhost:5250/';
const scriptTagEl = document.currentScript;
const version = scriptTagEl.getAttribute("data-version");
let baseUrl = 'https://performance.api.cuboapp.net/';
let tenantToken = scriptTagEl.getAttribute("data-token");

function main() {
  console.log('main',baseUrl,tenantToken);
  const shelfFunctions = async () => {
    const promises = await fetchProducts();
    if (promises[0].status === 'fulfilled') {
      if (document.querySelector('.shelfWrapper')) {
        document.querySelectorAll('.shelfWrapper').forEach((item) => {
          item.remove();
        });
      }
      await renderShelf(promises[0]?.value); // Wait for renderShelf to complete
      initializeSlider(); // This will now run after renderShelf finishes
    }
    observerHandler();
  };

  const onLoadFunctions = () => {
    // sendInteractionsToOrderVtex();
    sessionHandler('normalSession');
  };

  const normalPdpRender = () => {
    console.log('render normalPdpRender');
    onLoadFunctions();
    mainProductPageView();

    let counter = 0;
    const renderInterval = setInterval(async () => {
      const container = document.getElementById('corel_container');
      counter++;
      if (counter > 10) {
        clearInterval(renderInterval);
        return;
      }
      if (!container) {
        return;
      }

      // const observer = new MutationObserver((mutations) => {
      //   mutations.forEach((mutation) => {
      //     if (mutation.type === "attributes" && mutation.attributeName === "data-skuid") {
      //       shelfFunctions();
      //       console.log('change attr on div');
      //     }
      //   });
      // });
      // observer.observe(container, { attributes: true });

      shelfFunctions();
      clearInterval(renderInterval);
    }, 1000);
  };

  let currentProdId;

  window.addEventListener("message", function (event) {
    if (!event.data || !event.data.eventName) return;
    // console.log("VTEX Event Received:", event.data);
    switch (event.data.eventName) {
      case "vtex:productView":

        const productIdEvent = parseInt(event.data.product.productId);
        if (productIdEvent !== currentProdId) {

          currentProdId = event.data.product.productId;

          normalPdpRender();
        }
        break;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    onLoadFunctions();
  });
}



function abVersionHandler() {
    if (version=='a') {
      console.log("Master workspace");
      baseUrl = 'https://api.cuboapp.net/';
      tenantToken = scriptTagEl.getAttribute("data-token0");
      // main();
    }
    if (version=='b') {
      console.log("other workspace");
      baseUrl = 'https://performance.api.cuboapp.net/';
      tenantToken = scriptTagEl.getAttribute("data-token1");
      main();
    }
  console.log("version", version);
}

abVersionHandler()