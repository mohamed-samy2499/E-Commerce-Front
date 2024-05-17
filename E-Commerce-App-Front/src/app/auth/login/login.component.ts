import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  serverErrors: { [key: string]: string[] } = {};
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          if (response.succeeded) {
            this.router.navigate(['/products']);
          } else {
            this.serverErrors['errors'] = response.errors;
          }
        },
        error => {
          if ((error.status === 400|| error.status == 401) && error.error) {
            this.serverErrors = error.error;
          } else {
            console.error('Login error', error);
          }
        }
      );
    }
  }
}
