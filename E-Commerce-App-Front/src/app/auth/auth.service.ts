import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './auth.types';
import { Constants } from '../Shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private router:Router) { }
  
  register(user: any): Observable<any> {
    return this.http.post(`${Constants.API_END_POINT}${Constants.METHODS.REGISTER}`, user);
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${Constants.API_END_POINT}${Constants.METHODS.LOGIN}`, credentials).pipe(
      tap(response => {
        if (response.succeeded) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('expiresOn', response.expiresOn);
          // Optionally store other user details if needed
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('roles', JSON.stringify(response.roles));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresOn');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    localStorage.removeItem('cartId');

    // Redirect to login page or perform other logout actions
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const roles = localStorage.getItem('roles');
    if (roles) {
      return JSON.parse(roles).includes('ADMIN');
    }
    return false;
  }
}
