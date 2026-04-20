import { Injectable, signal } from '@angular/core';
import { EntryService } from '../entry/entry-service';
import { Entry } from '../../objects/Entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public isToggled = signal(false);

  constructor(private entryService: EntryService) {
  }

  loadEntries() : Observable<any> {
    console.log('Loading event dates...');
    const entryObj: Entry = {
      entryId: null,
      dtEntryDate: null,
      liReads: [],
      liWalks: [],
      objUser: null
    };
    return this.entryService.loadEntries(entryObj);

  }
}
