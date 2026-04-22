import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://book-walk-frontend.onrender.com/api/user';

  constructor(private http: HttpClient) {}

  loadUsers() {
    return this.http.get<any>(this.apiUrl + '/all');
  }

  getScores() {
    return this.http.get<any>(this.apiUrl + '/getScores');
  }
}
