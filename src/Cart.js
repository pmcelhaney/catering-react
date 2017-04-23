

export default class Cart {
  constructor(products = {}) {
    this.products = products;
  }


  addItem(newProduct) {
    const id = newProduct.id;
    const product = this.products[id] || { product: newProduct, quantity: 0 };
    const updatedProduct = Object.assign({}, product, {
      quantity: product.quantity + 1,
    });

    return new Cart(Object.assign({}, this.products, { [id]: updatedProduct }));
  }


}
