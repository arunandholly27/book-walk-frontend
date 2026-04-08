import { Component, OnInit, inject, ViewChild, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { EntryService } from '../../services/entry/entry-service';
import { Entry } from '../../objects/Entry';
import { TableRow } from '../../objects/TableRow';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-entry-table',
  imports: [ReactiveFormsModule, MatTableModule, RouterModule,
     MatSortModule, CommonModule, MatProgressSpinner],
  templateUrl: './entry-table.html',
  styleUrl: './entry-table.css',
})
export class EntryTable implements OnChanges {
  @Input() selectedDate!: Date;
  private _liveAnnouncer = inject(LiveAnnouncer);

  readColumns: string[] = ['entryId', 'pic', 'name', 'book', 'pages'];
  walkColumns: string[] = ['entryId', 'pic', 'name', 'walk', 'distance'];
  readSource = new MatTableDataSource<any>();
  walkSource = new MatTableDataSource<any>();

  @ViewChild('MatSort1') readSort!: MatSort;
  @ViewChild('MatSort2') walkSort!: MatSort;

  isLoading = false;

  constructor(private entryService: EntryService,private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    this.loadData(this.selectedDate);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadData(date: Date) {
    this.isLoading = true;
    const entryObj: Entry = {
        entryId: null,
        dtEntryDate: date,
        liReads: [],
        liWalks: [],
        objUser: null
    }

    this.entryService.loadEntries(entryObj).subscribe({
      next: (data) => {
        if (data != null && data.returnCode === 200) {
          const entries: Entry[] = data.objReturnObject;
          console.log(entries);
          const readRows: TableRow[] = entries.map(entry => ({
            entryId: 1,
            name: `${entry.objUser.strFirstName} ${entry.objUser.strLastName}`,
            book: `${entry.liReads[0]?.objBook?.strTitle || 'No Book'}`,
            pages: entry.liReads[0]?.pages,
            walk: `${entry.liWalks[0]?.strWalkName || 'No Walk'}`,
            distance: entry.liWalks[0]?.bdMiles || 0.0,
            pic: entry.objUser?.strPic != null 
              ? 'assets/' + entry.objUser.strPic : 'assets/default.jpg'
          })).filter(row => row.book !== 'No Book').map((row, index) => ({ ...row, entryId: index + 1 }));
          const walkRows = entries.map(entry => ({
            entryId: 1,
            name: `${entry.objUser.strFirstName} ${entry.objUser.strLastName}`,
            book: `${entry.liReads[0]?.objBook?.strTitle || 'No Book'}`,
            pages: entry.liReads[0]?.pages,
            walk: `${entry.liWalks[0]?.strWalkName || 'No Walk'}`,
            distance: entry.liWalks[0]?.bdMiles || 0.0,
            pic: entry.objUser?.strPic != null 
              ? 'assets/' + entry.objUser.strPic : 'assets/default.jpg'
          })).filter(row => row.walk !== 'No Walk').map((row, index) => ({ ...row, entryId: index + 1 }));
          console.log('Read Rows:', readRows);
          this.readSource = new MatTableDataSource(readRows);
          this.readSource.sort = this.readSort;
          this.walkSource = new MatTableDataSource(walkRows);
          this.walkSource.sort = this.walkSort;
          this.isLoading = false;
        }
      },error: (error) => {
      
        console.error('Error loading entries:', error);
        this.isLoading = false;
      
      },complete: () => {this.isLoading = false; this.cdr.markForCheck();}
    });
  }
    
}
