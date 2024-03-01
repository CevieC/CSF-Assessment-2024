import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartStore } from './cart.store'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {

  private router = inject(Router);
  private cartService = inject(CartStore); 

  itemCount = 0;

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.itemCount = cart.lineItems.length;
    });
  }

  checkout(): void {
    if (this.itemCount === 0) {
      alert('Your cart is empty. Please add some products before doing a checkout, thank you :>');
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}
