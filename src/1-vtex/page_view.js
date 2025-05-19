const mainProductPageView = () => {
  const sendPageViews = async (page, origin = '') => {
    // const sessionId = await getSession();
    const orderForm = window?.localStorage?.getItem('orderform');
    const orderFormId = JSON.parse(orderForm)?.id;
    const options = {
      'method': 'POST',
      'keepalive': true,
      'headers': {
        'Authorization': `Bearer ${tenantToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      },
      'body': JSON.stringify({
        // "page": page,
        "origin": origin,
        "externalSessionId": orderFormId,
        "externalSkuId": "string",
        "externalFromSkuId": "string"
      })
    };

    try {
      console.log('aqui sera o post pageview');
      const response = await fetch(`${baseUrl}v1/page-views`, options);//mudar endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const getCurrentData = () => {
    const currentData = localStorage.getItem('currentShelfInteractions');
    return currentData ? JSON.parse(currentData) : [];
  };

  const data = getCurrentData();
  if (!data) {
    sendPageViews('product', '');
    return null;
  }
  const normalizeReferrer = document.referrer.replace(window?.location?.origin, '');
  let allItemsFailed = true;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item?.originUrl === normalizeReferrer && item?.targetUrl === window?.location?.pathname) {
      data.pop(item);
      const origin = item?.origin || 'shelf';
      sendPageViews('product', origin);
      allItemsFailed = false;
    } else {
      item.readCount = item.readCount + 1;
      if (item?.readCount > 5) {
        data.pop(item);
      }
    }
  }

  if (allItemsFailed) {
    sendPageViews('product', '');
  }

  localStorage.setItem('currentShelfInteractions', JSON.stringify(data));
};