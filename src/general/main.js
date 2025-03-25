
// const baseUrl = 'http://localhost:5250/';
const baseUrl = 'https://api.cuboapp.net/';
const scriptTag = document.currentScript;
const tenantToken = scriptTag.getAttribute("data-token");

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    sendInteractionsToOrderVtex();
    sessionHandler('normalSession');
    if (document?.getElementsByClassName('vtex-product-context-provider')) {
      mainProductPageView();
    }
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
      fetchProducts().then(promises => {
        if (promises[0].status === 'fulfilled') {
          renderShelf(promises[0]?.value);
        }
      }).then(() => {
        initializeSlider();
        observerHandler();
      });
      watchNavigationVtex();
      clearInterval(renderInterval);
    }, 1000);

    const watchNavigationVtex = () => {
      const targetNode = document.getElementById('corel_container');
      console.log('targetNode', targetNode);
      if (targetNode) {
        const observer = new MutationObserver((mutations) => {
          console.log('mutations', mutations);
          mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "data-skuid") {
              console.log('mutation', mutation);
              sendInteractionsToOrderVtex();
              if (document?.getElementsByClassName('vtex-product-context-provider')) {
                mainProductPageView();
              }
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
            }
          });
        });
        observer.observe(targetNode, { attributes: true });
      } else {
        console.log('else');
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
              const newTargetNode = document.getElementById('corel_container');
              if (newTargetNode) {
                observer.disconnect();
                sendInteractionsToOrderVtex();
                if (document?.getElementsByClassName('vtex-product-context-provider')) {
                  mainProductPageView();
                }
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
              }
            }
          });
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    };
  });
}
main();