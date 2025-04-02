const sendInteractionsToOrderVtex = (tag) => {
  async function fetchOrderForm() {
    let settings = {
      method: "GET",
      headers: { "content-type": "application/json" },
      keepalive: true
    };
    let response = await fetch(
      "/api/checkout/pub/orderForm", settings
    );
    const result = await response.json();
    return result;
  }

  async function postCustomData(newInteraction) {
    const orderFormData = await fetchOrderForm();
    const orderFormId = orderFormData?.orderFormId;
    const orderFormCustomData = orderFormData?.customData?.customApps?.find(el => el?.id == "wec_ino");
    const currentInteractions = orderFormCustomData?.fields?.shelfItemInteraction;
    let body;
    if (currentInteractions) {
      body = [...(JSON.parse(currentInteractions)), newInteraction];
    } else {
      body = [newInteraction];
    }


    let settings = {
      method: "PUT",
      body: JSON.stringify({ 'value': JSON.stringify(body) }),
      headers: { "Content-Type": "application/json" },
      keepalive: true
    };

    let fetchResponse = await fetch(`/api/checkout/pub/orderForm/${orderFormId}/customData/wec_ino/shelfItemInteraction`, settings);
    let data = await fetchResponse.json();
    return data;
  }
  postCustomData(tag)
};
