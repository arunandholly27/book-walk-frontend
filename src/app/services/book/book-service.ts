import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/book';

  constructor(private http: HttpClient) {}

  loadBooks() {
    return this.http.get<any>(this.apiUrl + '/getAll');
  }

}
