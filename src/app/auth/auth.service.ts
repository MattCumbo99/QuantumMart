import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) {}

  passwordMatches(username: string, rawPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/check-password`, { username: username, rawPassword: rawPassword });
  }
}
