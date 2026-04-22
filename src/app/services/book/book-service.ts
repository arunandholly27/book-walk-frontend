import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleBook } from '../../objects/GoogleBook';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://book-walk-frontend.onrender.com/api/book';
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private googleApiKey = 'AIzaSyC4CM2s8PGnDcc1Hp9tCjLqSz8NQkibHqk';

  constructor(private http: HttpClient) {}

  loadBooks() {
    return this.http.get<any>(this.apiUrl + '/getAll');
  }
  
  searchBooks(title: string, author?: string): Observable<GoogleBook> {
    let url = `${this.googleBooksApiUrl}?q=intitle:${title}`;
    if (author) {
      url += `+inauthor:${author}`;
    }
    url += `&key=${this.googleApiKey}`;
    console.log('Searching books with URL:', url);
    return this.http.get<GoogleBook>(url);
  }

}
