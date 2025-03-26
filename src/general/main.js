
// const baseUrl = 'http://localhost:5250/';
const baseUrl = 'https://api.cuboapp.net/';
const scriptTag = document.currentScript;
const tenantToken = scriptTag.getAttribute("data-token");

function main() {
  const shelfFunctions = () => {
    fetchProducts().then(promises => {
      if (promises[0].status === 'fulfilled') {
        if (document.querySelector('.shelfWrapper')) {
          document.querySelectorAll('.shelfWrapper').forEach((item) => {
            item.remove();
          });
        }
        renderShelf(promises[0]?.value);
      }
    }).then(() => {
      initializeSlider();
      observerHandler();
    });
  };
  const onLoadFunctions = () => {
    sendInteractionsToOrderVtex();
    sessionHandler('normalSession');
  };

  const normalPdpRender = () => {
    console.log('render normalPdpRender');
    onLoadFunctions();
    if (document?.getElementsByClassName('vtex-product-context-provider')) {
      mainProductPageView();
    }
    let counter = 0;
    const renderInterval = setInterval(async () => {
      const container = document.getElementById('corel_container');
      counter++;
      if (counter > 10) {
        navigationWhileOnPdp();
        clearInterval(renderInterval);
        return;
      }
      if (!container) {
        return;
      }
      shelfFunctions();
      console.log('end normalPdpRender');
      clearInterval(renderInterval);
    }, 1000);
  };

  const navigationPdpToPdp = () => {
    console.log('render navigationPdpToPdp');
    onLoadFunctions();
    if (document?.getElementsByClassName('vtex-product-context-provider')) {
      mainProductPageView();
    }
    const targetNode = document.getElementById('corel_container');
    if (targetNode) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "data-skuid") {
            shelfFunctions();
            console.log('end navigationPdpToPdp');

          }
        });
      });
      observer.observe(targetNode, { attributes: true });
    }
  };
  // });


  document.addEventListener('DOMContentLoaded', () => {
    normalPdpRender();
    navigationPdpToPdp();
  });
}
main();