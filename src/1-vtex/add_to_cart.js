// window.addEventListener("message", function (event) {
//   if (!event.data || !event.data.eventName) return;

//   switch (event.data.eventName) {
//     case "vtex:cartChanged":
//       sendCartInteraction(event.data.items);
//       break;
//   }
// });

// const sendCartInteraction = async (items) => {

//   const sessionId = await getSession();
//   const options = {
//     'method': 'POST',
//     'keepalive': true,
//     'headers': {
//       'Authorization': `Bearer ${tenantToken}`,
//       'Content-Type': 'application/json; charset=utf-8'
//     },
//     'body': JSON.stringify({
//       "sessionId": sessionId,
//       "externalId": skuId,
//       "items": items,
//     })
//   };
////utilizar add e remove
//   // 'vtex:removeFromCart'
//   try {
//     const response = await fetch(`${baseUrl}v1/sku-events`, options);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// };