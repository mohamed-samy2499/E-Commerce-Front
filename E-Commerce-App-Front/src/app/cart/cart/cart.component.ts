import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartResponse } from '../cart.types';
import { LayoutComponent } from '../../layout/layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  {
  cart: any ; 
  cartId:number=0;
  constructor(private cartService: CartService,private router:Router) {}

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart():void{
    const cartIdStr = localStorage.getItem('cartId');
    if(cartIdStr){
      this.cartId = parseInt(cartIdStr, 10);
      this.cartService.getCartById(this.cartId).subscribe(
        (res:any)=>{
          console.log(res);
          
          this.cart = res;
          console.log("cart: ",this.cart);
          
        }
      );
    }
  }
  addItem(item:any){
    this.cartService.addItem(item).subscribe(
      (res:any)=>{
        
        this.loadCart();
        
        location.reload();
        
      }
    );
  }
  removeItem(item: any): void {
    this.cartService.removeItem(item).subscribe(
      () => {
        this.ngOnInit();
        location.reload();
      
      },
      error => console.error('Error removing item from cart', error)
    );
  }
  deleteItem(item:any){
    const isDelete = confirm("Are you sure to delete this item?");
    if(isDelete){
      this.cartService.deleteCartItem(item).subscribe(
        (res:any)=>{
  this.loadCart();
  location.reload();

        }
      );
    }

  }
}
