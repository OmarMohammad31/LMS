import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile: User | null = null;
  loading = true;
  errorMsg = '';

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;
    this.userService.getMe().subscribe({
      next: (data) => {
        this.userProfile = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Session expired or invalid token.';
        this.authService.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
