const mainProductPageView = () => {
  const sendPageViews = async (page, origin = '') => {
    const options = {
      'method': 'POST',
      'keepalive': true,
      'headers': {
        'Authorization': `Bearer ${tenantToken}`,
        'Content-Type': 'application/json; charset=utf-8'
      },
      'body': JSON.stringify({
        // "tenantId": tenantToken,
        "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "page": page,
        "origin": origin
      })
    };
    console.log(options.body);
    try {
      const response = await fetch(`${baseUrl}v1/sessions`, options);//mudar endpoint
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
    sendPageViews('product','')
    return null;
  }
  const normalizeReferrer = document.referrer.replace(window?.location?.origin, '');
  let allItemsFailed = true;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item?.originUrl === normalizeReferrer && item?.targetUrl === window?.location?.pathname) {
      data.pop(item);
      sendPageViews('product',item?.origin)
      allItemsFailed = false;
    } else {
      item.readCount = item.readCount + 1;
      if (item?.readCount > 5) {
        data.pop(item);
      }
    }
  }

  if (allItemsFailed) {
    sendPageViews('product','')
  }

  localStorage.setItem('currentShelfInteractions', JSON.stringify(data));
};