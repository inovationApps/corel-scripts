
const baseUrl = 'http://localhost:5250/';
const scriptTag = document.currentScript;
const tenantToken = scriptTag.getAttribute("data-token");
console.log(tenantToken);	
function main() {

  document.addEventListener('DOMContentLoaded', () => {
    // sendInteractionsToOrderVtex();
    sessionHandler('normalSession');
    if (document?.getElementsByClassName('vtex-product-context-provider')) { 
      mainProductPageView()
    }
    let counter = 0;
    const renderInterval = setInterval(async () => {
      console.log(counter);
      const container = document.getElementById('corel_container');
      counter++;

      if (counter > 5) {
        clearInterval(renderInterval);
        return;
      }
      if (!container) {
        return;
      }

      fetchProducts().then(promises => {
        if (
          promises[0].status === 'fulfilled'
        ) {
          renderShelf(promises[0]?.value);
        }
      }).then(() => {
        initializeSlider();
        observerHandler();
      });

      clearInterval(renderInterval);
    }, 500);
  });
}
main();

//eventos de interação