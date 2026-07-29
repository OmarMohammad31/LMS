import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginUser(): void {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Invalid credentials or login failed.';
      }
    });
  }
}
