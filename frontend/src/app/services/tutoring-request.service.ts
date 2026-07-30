import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutoringRequestService {

  private apiUrl = 'http://localhost:3000/tutoring-requests';

  constructor(private http: HttpClient) {}

  createRequest(topic: string): Observable<any> {
    return this.http.post(this.apiUrl, { topic });
  }

  getRequests(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
