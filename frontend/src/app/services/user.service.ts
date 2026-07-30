import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  // Backs the debug/admin page planned for Milestone 5.
  // Note: GET /users has no auth guard on the backend, flagged during
  // backend analysis, not something introduced by this method.
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}
