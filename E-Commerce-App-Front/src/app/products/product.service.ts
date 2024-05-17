import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../Shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  addProductToCart(productId:number,cartItem:any):Observable<any>{
    return this.http.post(`${Constants.API_END_POINT}${Constants.METHODS.ADD_PRODUCT_TO_CART}/${productId}`,cartItem);
  }

  getAllProducts(filterExpression?:string): Observable<any> {
    return this.http.get(`${Constants.API_END_POINT}${Constants.METHODS.GET_ALL_PRODUCTS}?filterExpressions=${filterExpression}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${Constants.API_END_POINT}${Constants.METHODS.GET_ALL_PRODUCTS}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${Constants.API_END_POINT}${Constants.METHODS.GET_ALL_PRODUCTS}`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${Constants.API_END_POINT}${Constants.METHODS.EDIT_PRODUCT}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${Constants.API_END_POINT}${Constants.METHODS.DELETE_PRODUCT}/${id}`);
  }
}
