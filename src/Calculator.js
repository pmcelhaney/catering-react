/* eslint-disable class-methods-use-this */
export default class Calculator {
  constructor({ salesTaxRate, creditCardFeeRate }) {
    this.salesTaxRate = salesTaxRate;
    this.creditCardFeeRate = creditCardFeeRate;
  }
  lineItemTotal(lineItem) {
    return lineItem.quantity * lineItem.item.unitPrice;
  }
  subTotal(lineItems) {
    return lineItems.reduce((acc, item) => acc + this.lineItemTotal(item), 0);
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


}
