import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from '../../objects/Entry';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiUrl = 'http://localhost:8080/api/entry';

  constructor(private http: HttpClient) {}

  createEntry(entry: Entry) {
    return this.http.post(this.apiUrl, entry);
  }

  loadEntries(entry: Entry) {
    return this.http.post<any>(this.apiUrl + '/load', entry);
  }

  deleteEntry(entry: Entry) {
    return this.http.post<any>(this.apiUrl + '/delete', entry);
  }

  loadEntriesByMonth(month: number) {
    return this.http.get<any>(this.apiUrl + '/loadByMonth?strMonth=' + month);
  }

}