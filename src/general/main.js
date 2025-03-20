
const baseUrl = 'http://localhost:5250/';
const tenantToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImUzNjMyMTc3LWM0NjktNGQ3MC1hNGRhLTU1ZDQwNWZjNTY0NCIsIm5iZiI6MTc0MjQ4OTE3OSwiZXhwIjoyNTM0MDIzMDA4MDAsImlhdCI6MTc0MjQ4OTE3OX0.qJeUajx0vOsomM2z0KwduWgEzbWf4hmy1m9mbqmcfkY';

function main() {
  
  document.addEventListener('DOMContentLoaded', () => {
    sendInteractionsToOrderVtex()
    let counter = 0
    const renderInterval = setInterval(async () => {
      console.log(counter)
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
      });

      clearInterval(renderInterval);
    }, 500);
  });
}
main();

//eventos de interação