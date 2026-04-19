import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/book';
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private googleApiKey = 'AIzaSyC4CM2s8PGnDcc1Hp9tCjLqSz8NQkibHqk';

  constructor(private http: HttpClient) {}

  loadBooks() {
    return this.http.get<any>(this.apiUrl + '/getAll');
  }
  
  searchBooks() {
    const url = `${this.googleBooksApiUrl}?q=subject:fiction&key=${this.googleApiKey}`;
    return this.http.get(url);
  }

}
