// function main () {
//   console.log('hello henry')

//   document.addEventListener('DOMContentLoaded', () => {
//     // const BASE_URL = 'jorgebischoff.cuboapp.net'; // vai ser passada a id no script
//     const BASE_URL = 'http://localhost:80';
//     const rendered_items_quantity = 15;
//     const show_sku_variations = false;
  
//     let categoryIds = ''; // Replace with actual category IDs
//     let productName = ''; // Replace with actual product name
//     let crosssell_skus = []; // Replace with actual cross-sell SKUs
//     let naming_skus = []; // Replace with actual naming SKUs
  
//     let data = [];
  
//     const fetchData = async () => {
//       const response = await fetch(`${BASE_URL}/scripts/upsell/${categoryIds}`);
//       const result = await response.json();
  
//       const removeSameProduct = result?.filter(el => el.product_name !== productName);
//       const upsellArray = removeSameProduct?.map(el => { el.origin = ['upsell']; return el; });
  
//       const maxLength = Math.max(
//         upsellArray?.length || 0,
//         crosssell_skus?.length || 0,
//         naming_skus?.length || 0
//       );
  
//       const bigArray = [];
  
//       for (let i = 0; i < maxLength; i++) {
//         if (i < upsellArray?.length) {
//           let existingElement = false;
//           if (show_sku_variations) {
//             existingElement = bigArray.some(el => el?.sku_id === upsellArray[i]?.sku_id);
//           } else {
//             existingElement = bigArray.some(el => el?.product_name === upsellArray[i]?.product_name);
//           }
  
//           if (upsellArray[i] && !existingElement) {
//             bigArray.push(upsellArray[i]);
//           } else if (existingElement) {
//             bigArray.find(el => el?.sku_id === upsellArray[i]?.sku_id)?.origin.push('upsell');
//           }
//         }
//         if (i < crosssell_skus?.length) {
//           let existingElement = false;
//           if (show_sku_variations) {
//             existingElement = bigArray.some(el => el?.sku_id === crosssell_skus[i]?.sku_id);
//           } else {
//             existingElement = bigArray.some(el => el?.product_name === crosssell_skus[i]?.product_name);
//           }
  
//           if (crosssell_skus[i] && !existingElement) {
//             bigArray.push(crosssell_skus[i]);
//           } else if (existingElement) {
//             bigArray.find(el => el?.sku_id === crosssell_skus[i]?.sku_id)?.origin.push('crosssell');
//           }
//         }
//         if (i < naming_skus?.length) {
//           let existingElement = false;
//           if (show_sku_variations) {
//             existingElement = bigArray.some(el => el?.sku_id === naming_skus[i]?.sku_id);
//           } else {
//             existingElement = bigArray.some(el => el?.product_name === naming_skus[i]?.product_name);
//           }
  
//           if (naming_skus[i] && !existingElement) {
//             bigArray.push(naming_skus[i]);
//           } else if (existingElement) {
//             bigArray.find(el => el?.sku_id === naming_skus[i]?.sku_id)?.origin.push('naming');
//           }
//         }
//       }
  
//       data = bigArray.slice(0, rendered_items_quantity);
//       renderShelf();
//     };
  
//     const renderShelf = () => {
//       const container = document.getElementById('corel_container');
//       const shelfWrapper = document.createElement('div');
//       shelfWrapper.className = 'shelfWrapper';
  
//       const shelfTitle = document.createElement('h4');
//       shelfTitle.className = 'shelfTitle';
//       shelfTitle.textContent = 'Recomendados para você';
  
//       const slider = document.createElement('div');
//       slider.className = 'slider';
  
//       data.forEach((el, index) => {
//         const item = document.createElement('div');
//         item.className = 'shelfItem';
//         item.setAttribute('sku_id', el?.sku_id);
//         item.addEventListener('click', () => {
//           console.log("click");
//           productClickHandler(el?.sku_id, el?.detail_url, el?.origin);
//           sendConversion(el?.sku_id, pageSkuId, index, el?.origin);
//         });
  
//         const img = document.createElement('img');
//         img.className = 'shelfItemImage';
//         img.src = el?.image_url?.replace(/\/ids\/(\d+)(-\d+-\d+)?/, (match, p1, p2) => `/ids/${p1}-250-250`);
//         img.alt = el?.product_name;
  
//         const name = document.createElement('p');
//         name.className = 'shelfItemName';
//         name.textContent = el?.product_name;
  
//         item.appendChild(img);
//         item.appendChild(name);
  
//         slider.appendChild(item);
//       });
  
//       shelfWrapper.appendChild(shelfTitle);
//       shelfWrapper.appendChild(slider);
//       container.appendChild(shelfWrapper);
  
//       initializeSlider();
//     };
  
//     const initializeSlider = () => {
//       // Slick slider initialization (you can use vanilla JS or a different library to initialize this)
//       // For now, assuming you're including slick carousel in your HTML
  
//       const slider = document.querySelector('.slider');
//       $(slider).slick({
//         dots: true,
//         arrows: true,
//         infinite: false,
//         slidesToShow: window.innerWidth <= 1024 ? 2 : 4,
//         slidesToScroll: window.innerWidth <= 1024 ? 2 : 4,
//         autoplay: false
//       });
//     };
  
//     const productClickHandler = (sku_id, link, origin) => {
//       sendClick(sku_id);
//       saveClick(link, origin);
//     };
  
//     const sendClick = (sku_id) => {
//       const full_url = `${BASE_URL}/scripts/upsell/click/${sku_id}`;
//       fetch(full_url, { method: "GET", cache: "no-cache", keepalive: true });
//     };
  
//     const saveClick = (link, origin) => {
//       const presentUrl = window?.location?.pathname;
//       const futureUrl = link;
//       const urlsObj = {
//         'originUrl': presentUrl,
//         'targetUrl': futureUrl,
//         'origin': origin,
//         'readCount': 0
//       };
  
//       let body;
//       const currentData = localStorage.getItem('currentShelfInteractions');
//       if (currentData) {
//         const currentDataJson = JSON.parse(currentData);
//         currentDataJson.push(urlsObj);
//         body = currentDataJson;
//       } else {
//         body = [urlsObj];
//       }
  
//       localStorage.setItem('currentShelfInteractions', JSON.stringify(body));
//     };
  
//     const sendConversion = (sku_id, pageSkuId, shelfIndex, origin) => {
//       console.log(origin);
//       marketingTagSender({ pageSkuId: pageSkuId, skuId: sku_id, origin: origin, position: shelfIndex + 1 });
//     };
  
//     fetchData(); // Call to fetch the data when the page loads
//   });
  
// }
// main()