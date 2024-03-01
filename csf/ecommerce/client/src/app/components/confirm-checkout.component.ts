import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartStore } from '../cart.store'; 
import { ProductService } from '../product.service';
import { LineItem, Order } from '../models'; 

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.css']
})

export class ConfirmCheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  cartItems: LineItem[] = [];
  total = 0;

  constructor(private cartStore: CartStore, private productService: ProductService) {}


  ngOnInit() {
    this.checkoutForm = this.createFormGroup();
    this.cartStore.cart$.subscribe(cart => {
      console.log(cart); 
      this.cartItems = cart.lineItems;
      this.calculateTotal();
    });
    
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      priority: new FormControl(false),
      comments: new FormControl('')
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      const order: Order = {
        name: this.checkoutForm.value.name,
        address: this.checkoutForm.value.address,
        priority: this.checkoutForm.value.priority,
        comments: this.checkoutForm.value.comments,
        cart: {
          lineItems: this.cartItems
        }
      };
  
      this.productService.checkout(order).subscribe({
        next: (response) => {
          console.log('Order successfully placed', response);
        },
        error: (error) => {
          console.error('Error placing order', error);
        }
      });
    } else {
      console.error('Form is invalid or cart is empty');
    }
  }
  
}
