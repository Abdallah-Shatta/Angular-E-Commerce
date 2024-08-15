import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Cart } from '../../shared/models/cart.model';
import { CurrencyPipe } from '@angular/common';
import { TrimtextPipe } from '../../shared/pipes/trimtext.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, TrimtextPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private cartSrv: CartService){}
  
  userCart: Cart = {} as Cart;
  ngOnInit(): void {
    this.cartSrv.getUserCart().subscribe(
      {
        next:(response)=>{
          this.userCart = response.data;
        }
      });
  }

  removeItemFromCart(id: string){
    this.cartSrv.removeItem(id).subscribe({
      next:(response)=>{
        this.userCart = response.data;
      }
    });
  }

  updateCount(id: string, count: number){
    if(count > 0){
      this.cartSrv.updateProductCount(id, count).subscribe({
        next:(response)=>{
          this.userCart = response.data;
        }
      });
    }else{
      this.removeItemFromCart(id);
    }
  }
}
