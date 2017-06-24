/* eslint-disable class-methods-use-this */
export default class Calculator {
  constructor({ salesTaxRate, creditCardFeeRate, discounter }) {
    this.salesTaxRate = salesTaxRate;
    this.creditCardFeeRate = creditCardFeeRate;
    this.discounter = discounter;
  }
  lineItemTotal(lineItem) {
    return lineItem.quantity * lineItem.item.unitPrice;
  }
  subTotalBeforeDiscount(lineItems) {
    return lineItems.reduce((acc, item) => acc + this.lineItemTotal(item), 0);
  }
  subTotal(lineItems) {
    return this.discounter.applyTo(this.subTotalBeforeDiscount(lineItems));
  }
  salesTax(lineItems) {
    return this.salesTaxRate * this.subTotal(lineItems);
  }
  total(lineItems) {
    return this.subTotal(lineItems) + this.salesTax(lineItems);
  }
  creditCardFee(lineItems) {
    return this.creditCardFeeRate * this.total(lineItems);
  }
  totalWithCreditCard(lineItems) {
    return this.total(lineItems) + this.creditCardFee(lineItems);
  }
  discount(lineItems) {
    return this.discounter.amount(this.subTotalBeforeDiscount(lineItems));
  }


}
