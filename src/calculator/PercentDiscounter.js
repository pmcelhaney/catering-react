import Discounter from './Discounter';

export default class PercentDiscounter extends Discounter {
  constructor(value) {
    super();
    this.value = value || 0;
  }
  label() {
    return `(${this.value}%)`;
  }
  amount(subtotal) {
    return subtotal * this.rate();
  }
  rate() {
    return Math.min(this.value / 100, 1);
  }
  hasValue() {
    return this.value && this.value > 0;
  }
}
