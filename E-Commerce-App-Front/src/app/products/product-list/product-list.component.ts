import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  initialProductState = {
    "id": 0,
    "name": "",
    "price": 0,
    "description": "",
    "imageUrl": "",
    "active": true
  };
  cartItem={
    "quantity": 0,
    "price": 0,
    "productId": 0,
    "cartId": 0
  }
  productObj = { ...this.initialProductState };
  productsList: any[] = [];
  isSidePanelVisible: boolean = false;
  isAdmin: boolean = false;
  filterExpression: string = "Active==true";

  constructor(private productService: ProductService, private authService: AuthService,private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAllProducts();
    
  }

  addToCart(product:any){
    const cartIdStr = localStorage.getItem("cartId");
    if(cartIdStr)
      this.cartItem.cartId = parseInt(cartIdStr,10);

    this.cartItem.price = product.price;
    this.cartItem.productId = product.id;

    this.productService.addProductToCart(product.id,this.cartItem).subscribe(
      (res:any) => {

        this.router.navigateByUrl("/cart");
      }
    );
  }

  onCancel() {
    this.resetProductObj();
    this.closeSidePanel();
  }
  onCreate() {
    this.resetProductObj();
    this.openSidePanel();
  }
  Create() {
    this.productService
      .createProduct(this.productObj)
      .subscribe(
        (res: any) => {

          if (res.id > 0) {
            this.getAllProducts();
            alert("Product Created Successfully!");

          }
          else {
            alert(res.errors)
          }
        }
      );
  }
  onEdit(product: any) {
    this.productObj = product;
    this.openSidePanel();
  }
  Edit() {
    this.productService
      .updateProduct(this.productObj.id, this.productObj)
      .subscribe(
        (res: any) => {
          if (res.id > 0) {
            this.onCancel();
            this.getAllProducts();
            alert("Product updated successfully!");
          }
          else {
            alert(res.errors);
          }
        }
      );
  }
  onDelete(product: any) {
    const isDelete = confirm("Are you sure to delete this product?");
    if(isDelete){
      this.productService
      .deleteProduct(product.id).subscribe(
        (res: any) => {
          console.log(res);
          this.getAllProducts();
          alert("Product Deleted Successfully!!");
        }
      );
    }
   
  }
  activate(product:any){
    product.active = true;
    this.productService
    .updateProduct(product.id, product)
    .subscribe(
      (res: any) => {

        if (res.id > 0) {
          this.onCancel();
          this.getAllProducts();
          alert("Product activated successfully!");
        }
        else {
          alert(res.errors);
        }
      }
    );
  }
  deactivate(product:any){
    product.active = false;
    this.productService
    .updateProduct(product.id, product)
    .subscribe(
      (res: any) => {
        if (res.id > 0) {
          this.onCancel();
          this.getAllProducts();
          alert("Product deactivated successfully!");
        }
        else {
          alert(res.errors);
        }
      }
    );
  }
  resetProductObj() {
    this.productObj = { ...this.initialProductState };
  }
  getAllProducts() {
    if(this.isAdmin){
      this.productService
      .getAllProducts("")
      .subscribe(

        (res: any) => {
          this.productsList = res;
        }
      );
    }
    else{
      this.productService
      .getAllProducts(this.filterExpression)
      .subscribe(

        (res: any) => {
          this.productsList = res;
        }
      );
    }
   
  }
  openSidePanel() {
    this.isSidePanelVisible = true;
  }
  closeSidePanel() {
    this.isSidePanelVisible = false;
  }
}
