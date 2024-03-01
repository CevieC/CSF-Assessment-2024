// TODO Task 2
// Use the following class to implement your store

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, LineItem, Product } from './models';

@Injectable({
  providedIn: 'root',
})

export class CartStore {

    private cartSubject = new BehaviorSubject<Cart>({ lineItems: [] });
    cart$ = this.cartSubject.asObservable();

    constructor() {}

    addToCart(item: LineItem): void {
        
        let cart = this.cartSubject.value;
        console.log(item); 
    
        const itemIndex = cart.lineItems.findIndex((lineItem) => lineItem.prodId === item.prodId);
        if (itemIndex > -1) {
            cart.lineItems[itemIndex].quantity += item.quantity;
        } else {
            cart.lineItems.push(item);
        }
        this.cartSubject.next(cart);
    }
    

    
}


