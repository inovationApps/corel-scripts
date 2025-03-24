const getSession = async () => {
  const options = {
    'method': 'GET',
    'keepalive': true,
    'headers': {
      'content-type': 'application/json'
    }
  };

  try {
    const response = await fetch(`/api/sessions?items=id`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();

    return result.id;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const sendSession = async (sessionId, shelfViewed = false, version = '') => {
  const options = {
    'method': 'POST',
    'keepalive': true,
    'headers': {
      'Authorization': `Bearer ${tenantToken}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    'body': JSON.stringify({
      // "tenantId": tenantToken,
      // "tenantId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "externalId": sessionId,
      "externalTestId": version,
      "isShowcaseSeen": shelfViewed
    })
  };
  
  try {
    const response = await fetch(`${baseUrl}v1/sessions`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const sessionHandler = async (sessionType) => {
  const sessionId = await getSession();
  // const sessionId = '7fae9e4c-22ec-4993-8d51-063b62b35c6d';
  const sessionStorageSessionId = sessionStorage.getItem(sessionType);
  if (!sessionStorageSessionId || sessionStorageSessionId !== sessionId) {
    sessionStorage.setItem(sessionType, sessionId);
    if (sessionType === 'normalSession') {
      sendSession(sessionId);
    } else if (sessionType === 'shelfSession') {
      sendSession(sessionId, true);
    }
  }
};