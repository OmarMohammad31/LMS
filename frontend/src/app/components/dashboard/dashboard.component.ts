import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile: any = null;
  loading: boolean = true;
  errorMsg: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (data: any) => {
        this.userProfile = data;
        this.loading = false;
      },
      error: (err: any) => {
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
