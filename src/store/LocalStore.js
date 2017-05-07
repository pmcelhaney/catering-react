// This is a really quick and dirty way to save things in localStorage.
// It will be replaced with an implementation that uses a server and / or
// IndexedDB.

export default {
  createOrder() {
    return this.loadData().then((data) => {
      const orderId = data.nextOrderId;
      const order = {
        id: orderId,
        lineItems: [],
        header: {},
      };
      const copy = data;
      copy.orders[orderId] = order;
      copy.nextOrderId += 1;
      this.saveData(copy);
      return order;
    });
  },

  loadData() {
    return new Promise((resolve, reject) => {
      try {
        let stringData = window.localStorage.getItem('catering');
        if (!stringData) {
          stringData = JSON.stringify({
            nextOrderId: 1,
            orders: {},
          });
          window.localStorage.setItem('catering', stringData);
        }
        resolve(JSON.parse(stringData));
      } catch (e) {
        reject(e);
      }
    });
  },

  saveData(data) {
    window.localStorage.setItem('catering', JSON.stringify(data));
  },

};
