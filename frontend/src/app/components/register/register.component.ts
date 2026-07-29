import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {
    name: '',
    email: '',
    password: '',
    isInstructor: false
  };

  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  registerUser(): void {
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Try a different email.';
      }
    });
  }
}
