import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  itemsCount: Number=0;
  isAdmin: boolean=false;
constructor(private cartService:CartService,private authService:AuthService){}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.cartService.getCurrentCart()
    .subscribe(
      (res:any) => {
        this.itemsCount = res.itemsCount;
        localStorage.setItem("cartId",res.id);
      }
    );
  }

}
