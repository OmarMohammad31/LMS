import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TutoringService {
  private baseUrl = 'http://localhost:5000/tutoring-requests';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listOpenRequests() {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() });
  }

  acceptRequest(requestId: string, data: { startTime: string; durationMinutes: number }) {
    return this.http.post(`${this.baseUrl}/${requestId}/accept`, data, { headers: this.getHeaders() });
  }
}