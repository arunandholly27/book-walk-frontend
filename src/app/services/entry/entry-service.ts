import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from '../../objects/Entry';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiUrl = 'http://localhost:8080/api/entry';
  private googleBooksApiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private googleApiKey = 'AIzaSyC4CM2s8PGnDcc1Hp9tCjLqSz8NQkibHqk';
  

  constructor(private http: HttpClient) {}

  createEntry(entry: Entry) {
    return this.http.post(this.apiUrl, entry);
  }

  loadEntries(entry: Entry) {
    return this.http.post<any>(this.apiUrl + '/load', entry);
  }

  loadEntriesByMonth(month: number) {
    return this.http.get<any>(this.apiUrl + '/loadByMonth?strMonth=' + month);
  }

  searchBooks() {
    const url = `${this.googleBooksApiUrl}?q=subject:fiction&key=${this.googleApiKey}`;
    return this.http.get(url);
  }

}