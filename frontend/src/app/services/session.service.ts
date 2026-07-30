import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSessionPayload, Session } from '../models/session.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private baseUrl = `${environment.apiUrl}/sessions`;

  constructor(private http: HttpClient) {}

  list(): Observable<Session[]> {
    return this.http.get<Session[]>(this.baseUrl);
  }

  create(payload: CreateSessionPayload): Observable<Session> {
    return this.http.post<Session>(this.baseUrl, payload);
  }

  book(sessionId: string): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}/${sessionId}/book`, {});
  }

  getRoster(sessionId: string): Observable<{ _id: string; name: string; email: string }[]> {
    return this.http.get<{ _id: string; name: string; email: string }[]>(
      `${this.baseUrl}/${sessionId}/roster`
    );
  }
}
