export default class Discounter {
  constructor(value) {
    this.value = value;
  }
  label() { // eslint-disable-line class-methods-use-this
    return '';
  }
  applyTo(subtotal) {
    return subtotal - this.amount(subtotal);
  }
}
