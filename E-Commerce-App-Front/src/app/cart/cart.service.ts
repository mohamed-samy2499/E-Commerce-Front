import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Constants } from '../Shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  getCartById(id:number): Observable<any> {
    return this.http.get(`${Constants.API_END_POINT}${Constants.METHODS.GET_CART_BY_ID}/${id}`);
  }
  getCurrentCart(): Observable<any>{
    return this.http.get(`${Constants.API_END_POINT}${Constants.METHODS.GET_CURRENT_CART_INFO}`);
  }
  addItem(item: any): Observable<any> {
    return this.http.post(`${Constants.API_END_POINT}${Constants.METHODS.ADD_CART_ITEM}`, item);
  }

  removeItem(item: any): Observable<any> {
    return this.http.post(`${Constants.API_END_POINT}${Constants.METHODS.REMOVE_CART_ITEM}`, item);
  }
  deleteCartItem(item: any): Observable<any> {
    return this.http.post(`${Constants.API_END_POINT}${Constants.METHODS.DELETE_CART_ITEM}`, item);
  }

  updateCart(cartId: any,cart: any) : Observable<any>{
    return this.http.put(`${Constants.API_END_POINT}${Constants.METHODS.EDIT_CART}/${cartId}`,cart);
  }
  deleteCart(cartId: any) : Observable<any>{
    return this.http.delete(`${Constants.API_END_POINT}${Constants.METHODS.DELETE_CART}/${cartId}`);
  }
}
