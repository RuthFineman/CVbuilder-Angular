import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt/jwt.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/Users`;
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.authService.login(this.loginForm.value)
    .subscribe({
      next: (response) => {
        if (!this.jwtService.isAdmin(response.token)) {
          this.error = 'אין לך הרשאות מנהל';
          this.loading = false;
          return;
        }
  
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminId', response.id);
        alert("yesssssssss")
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error || 'התחברות נכשלה, אנא נסה שוב';
        this.loading = false;
      }
    });
  }

}