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
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-entry-table',
  imports: [ReactiveFormsModule, MatTableModule, RouterModule,
     MatSortModule, CommonModule, MatProgressSpinner, MatIconModule,
      MatButtonModule, MatDialogModule, MatMenu, MatMenuTrigger],
  templateUrl: './entry-table.html',
  styleUrl: './entry-table.css',
})
export class EntryTable implements OnChanges {
  @Input() selectedDate!: Date;
  private _liveAnnouncer = inject(LiveAnnouncer);

  readColumns: string[] = ['displayId', 'pic', 'name', 'book', 'pages', 'delete'];
  walkColumns: string[] = ['displayId', 'pic', 'name', 'walk', 'distance', 'delete'];
  readSource = new MatTableDataSource<any>();
  walkSource = new MatTableDataSource<any>();

  @ViewChild('MatSort1') readSort!: MatSort;
  @ViewChild('MatSort2') walkSort!: MatSort;
  @ViewChild('deleteConfirmation') deleteConfirmationTemplate: any;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  isLoading = false;

  constructor(private entryService: EntryService,private cdr: ChangeDetectorRef,
      private dialog: MatDialog
  ) { }

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
            entryId: entry.entryId,
            displayId: 1,
            name: `${entry.objUser.strFirstName} ${entry.objUser.strLastName}`,
            book: entry.liReads[0]?.objBook,
            pages: entry.liReads[0]?.pages,
            walk: `${entry.liWalks[0]?.strWalkName || 'No Walk'}`,
            distance: entry.liWalks[0]?.bdMiles || 0.0,
            pic: entry.objUser?.strPic != null 
              ? 'assets/' + entry.objUser.strPic : 'assets/default.jpg'
          })).filter(row => row.book !== 'No Book').map((row, index) => ({ ...row, displayId: index + 1 }));
          const walkRows = entries.map(entry => ({
            entryId: entry.entryId,
            displayId: 1,
            name: `${entry.objUser.strFirstName} ${entry.objUser.strLastName}`,
            book: entry.liReads[0]?.objBook,
            pages: entry.liReads[0]?.pages,
            walk: `${entry.liWalks[0]?.strWalkName || 'No Walk'}`,
            distance: entry.liWalks[0]?.bdMiles || 0.0,
            pic: entry.objUser?.strPic != null 
              ? 'assets/' + entry.objUser.strPic : 'assets/default.jpg'
          })).filter(row => row.walk !== 'No Walk').map((row, index) => ({ ...row, displayId: index + 1 }));
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

  onDelete(entryId: any) {
    const dialogRef = this.dialog.open(this.deleteConfirmationTemplate);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const entry: Entry = {
          entryId: entryId,
          dtEntryDate: null,
          liReads: [],
          liWalks: [],
          objUser: null
        };
        this.entryService.deleteEntry(entry).subscribe({
          next: (data) => {
            if (data != null && data.returnCode === 200) {
              console.log('Entry deleted successfully');
              this.loadData(this.selectedDate);
            } else {
              console.error('Failed to delete entry:', data);
            }
          },
          error: (error) => {
            console.error('Error deleting entry:', error);
          }
        });
      }
    });
  }
    
}
