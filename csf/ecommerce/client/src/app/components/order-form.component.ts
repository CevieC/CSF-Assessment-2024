import { Component, Input, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineItem } from '../models';
import { CartStore } from '../cart.store'; 

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'] 
})
export class OrderFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private cartService = inject(CartStore); 

  @Input() productId!: string; 
  @Input() productName!: string;
  @Input() productPrice!: number;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.createForm();
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.productName, 
      price: this.productPrice
    };

    this.cartService.addToCart(lineItem); 

    this.form.reset({ quantity: 1 }); 
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [Validators.required, Validators.min(1)])
    });
  }

}
