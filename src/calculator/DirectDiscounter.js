import Discounter from './Discounter';

export default class DirectDiscounter extends Discounter {
  constructor(value) {
    super();
    this.value = value;
  }
  amount(subtotal) {
    return this.value > subtotal ? subtotal : this.value;
  }
  hasValue() {
    return this.value > 0;
  }
}
