import { expect } from 'chai';
import Cart from './Cart';

it('adds an item that has not been added already', () => {
  const cart = new Cart();
  const product = { id: 1, name: 'bread' };
  const newCart = cart.addItem(product);
  expect(newCart.products[1].quantity).to.equal(1);
});

it('adds an item by incrementing its quanity if already in the cart', () => {
  const cart = new Cart();
  const product = { id: 1, name: 'bread' };
  const newCart = cart.addItem(product).addItem(product).addItem(product);
  expect(newCart.products[1].quantity).to.equal(3);
});


it('adds two different items', () => {
  const cart = new Cart();
  const bread = { id: 1, name: 'bread' };
  const bbq = { id: 2, name: 'BBQ' };
  const newCart = cart.addItem(bread).addItem(bbq).addItem(bread);
  expect(newCart.products[1].quantity).to.equal(2);
  expect(newCart.products[2].quantity).to.equal(1);
});
