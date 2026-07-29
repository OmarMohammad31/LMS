import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  getProfile() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/users/me`, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
