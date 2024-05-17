import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Assuming you have a way to determine if the user is an admin
    // For example, you might decode the JWT token to check user roles
  if (this.authService.isAuthenticated() /*&& this.authService.isAdmin()*/) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}