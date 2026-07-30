import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TutoringRequestService {

  private apiUrl = 'http://localhost:5000/tutoring-requests';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders() {
    const token = this.authService.getToken();

    return {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`
      )
    };
  }

  createRequest(topic: string): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { topic },
      this.getHeaders()
    );
  }

  getRequests(): Observable<any> {
    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );
  }
}
