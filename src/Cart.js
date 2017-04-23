export default class Cart {
  constructor(options) {
    this.options = options;
    this.lineItems = [];
  }

  addItem(item) {
    const existingLineItem = this.getLineItemById(item.id);
    if (existingLineItem) {
      existingLineItem.quantity += 1;
    } else {
      this.lineItems.push({
        item,
        quantity: 1,
        price() { return this.quantity * this.item.unitPrice; },
      });
    }
  }
  getLineItemById(id) {
    return this.lineItems.find(li => li.item.id === id);
  }
  subTotal() {
    return this.lineItems.reduce((acc, item) => acc + item.price(), 0);
  }
  salesTax() {
    return this.options.salesTaxRate * this.subTotal();
  }
  total() {
    return this.subTotal() + this.salesTax();
  }
  creditCardFee() {
    return this.options.creditCardFeeRate * this.total();
  }
  totalWithCreditCard() {
    return this.total() + this.creditCardFee();
  }


}
