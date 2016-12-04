import { Component, OnInit } from '@angular/core';

import { ProductsService } from './services/products-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products = [];
  cart = [];
  cartTotal: number = 0.00;
  cartOneTimeTotal: number = 0.00;
  cartMonthlyTotal: number = 0.00;
  cartSubTotal: number = 0.00;
  cartDeliveryCosts: number = 0.00;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getProducts()
      .then(data => this.products = data);
  }

  addToCart(product): void {
    /* Check if the item already exists and inc. the quantity else add it*/
    let cartItem = this.cart.find(x => x.product.id === product.id);

    if (cartItem) {
      cartItem.quantity ++;
      cartItem.totalPrice += product.price;
    }else {
      cartItem = {
        product: product,
        quantity : 1,
        totalPrice : product.price
      };

      this.cart.push(cartItem);
    }

    /* update Cart total */
    this.updateTotals(cartItem);
  }

  removeFromCart(item): void {
    let index = -1;
    let cartItem = this.cart.find((x, i) => {
      if (x.product.id === item.product.id) {
        index = i;
        return true;
      }
    });

    this.updateTotals(cartItem, -1);

    this.cart.splice(index, 1);
  }

  updateTotals(cartItem, sign = 1): void {
    /*update subscription */
    if (cartItem.product.subscription) {
      this.cartMonthlyTotal += (sign * cartItem.product.price);
    } else {
      this.cartOneTimeTotal += (sign * cartItem.product.price);
    }

    /* update subtotal */
    this.cartSubTotal += (sign * cartItem.product.price);
    this.cartTotal = this.cartSubTotal + this.cartDeliveryCosts;
  }
}
