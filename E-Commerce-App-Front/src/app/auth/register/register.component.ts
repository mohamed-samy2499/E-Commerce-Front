import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register({
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe(
      () => this.router.navigate(['/login']),
      error => console.error('Registration error', error)
    );
  }
}
