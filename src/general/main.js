
// const baseUrl = 'http://localhost:5250/';
const baseUrl = 'https://api.cuboapp.net/';
const scriptTag = document.currentScript;
const tenantToken = scriptTag.getAttribute("data-token");

function main() {
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

  window.addEventListener("message", function (event) {
    if (!event.data || !event.data.eventName) return;
    // console.log("VTEX Event Received:", event.data);
    switch (event.data.eventName) {
      case "vtex:productView":
        // console.log("Product viewed trough message");
        normalPdpRender();
        break;
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    onLoadFunctions();
  });
}
main();