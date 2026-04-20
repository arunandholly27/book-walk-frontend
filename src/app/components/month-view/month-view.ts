//src/app/components/month-view/month-view.component.ts
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormModal } from '../modal/form-modal';
import { CommonModule, formatDate } from '@angular/common';
import { EventListComponent } from '../event-list/event-list';
import { EventService } from '../../services/event';
import { MatDialogModule } from '@angular/material/dialog';
import { EntryService } from '../../services/entry/entry-service';
import { Entry } from '../../objects/Entry';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { BookService } from '../../services/book/book-service';
import { Book } from '../../objects/Book';
import { UserService } from '../../services/user/user-service';
import { GoogleBook } from '../../objects/GoogleBook';

@Component({
    selector: 'app-month-view',
    standalone: true,
    imports: [CommonModule, EventListComponent, MatDialogModule, FormModal,
         MatExpansionPanel, MatExpansionPanelHeader],
    templateUrl: './month-view.html',
    styleUrls: ['./month-view.css'],
})
export class MonthViewComponent implements OnInit {
    @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

    @Input() date!: Date;
    days: Date[] = [];
    events: { [key: string]: string[] } = {};
    selectedDate: Date | null = null;
    isModalVisible = false;
    showEvents = false;
    eventDates: any[] = [];
    users: any[] = [];
    books: any[] = [];

    constructor(private eventService: EventService, private userService: UserService,
         private entryService: EntryService, private bookService: BookService) { }

    ngOnInit() {
        this.getEventDates();
        this.days = this.getDaysInMonth();
        this.loadUsers();
        this.loadBooks();
    }
    testBooks() {
        this.bookService.searchBooks('Everyone on this train').subscribe({
            next: (data) => {
                const counts: Record<string, number> = {};
                let maxItem = data.items[0];
                let maxCount = 0;
                data.items.forEach((item) => {
                    const pageCount = item.volumeInfo.pageCount || 0;
                    if (pageCount != 0) {
                        counts[pageCount] = (counts[pageCount] || 0) + 1;
                        if (counts[pageCount] > maxCount) {
                            maxCount = counts[pageCount];
                            maxItem = item;
                        }
                    }
                });
                console.log('Most common page count:', maxItem.volumeInfo.pageCount);
                let book: Book = {
                    bookId: null,
                    strTitle: maxItem.volumeInfo.title,
                    strAuthor: maxItem.volumeInfo.authors[0] || 'Unknown Author',
                    iTotalPages: maxItem.volumeInfo.pageCount || 0,
                    iCurrentPage: 0,
                    liReads: []
                }
                console.log('Book found:', book);
            },
            error: (error) => {
                console.error('Error searching books:', error);
            }
        });
    }

    loadUsers() {
        this.userService.loadUsers().subscribe({
            next: (data) => {
                this.users = data.objReturnObject;
                console.log('Users loaded:', this.users);
            },
            error: (error) => {
                console.error('Error loading users:', error);
            }
        });
    }

    ngOnChanges() {
        this.days = this.getDaysInMonth();
    }
    selectDate(day: Date) {
        this.selectedDate = day;
        this.showEvents = true;
        if (this.expansionPanel) {
            this.expansionPanel.open();
        }
    }
    getDaysInMonth(): Date[] {
        const days = [];
        const year = this.date.getFullYear();
        const month = this.date.getMonth();
        const numDays = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= numDays; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }

    getEventDates(): string[] {
        const entryObj: Entry = {
                entryId: null,
                dtEntryDate: null,
                liReads: [],
                liWalks: [],
                objUser: null
            }        
        this.entryService.loadEntries(entryObj).subscribe({
            next: (data) => {
                if (data != null && data.returnCode === 200) {
                    const entries: Entry[] = data.objReturnObject;
                    const eventDates = entries.map(entry => entry.dtEntryDate);
                    this.eventDates = eventDates;
                    return eventDates;
                } else {
                    console.error('Failed to load entries:', data);
                    return [];
                }
            },
            error: (error) => {
                console.error('Error loading entries:', error);
                return [];
            }
        });
        return [];
        
    }
    
    checkEvent(day: Date) {
        const formattedDate = formatDate(day, 'yyyy-MM-dd', 'en-US');
        if (this.eventDates?.includes(formattedDate)) {
            return true;
        }
        return false;
    }
    showModal(date: Date) {
        scroll(0,0);
        this.showEvents = false;
        this.isModalVisible = true;
    }
    hideModal() {
        this.isModalVisible = false;
        this.showEvents = true;
    }
    loadBooks() {
        this.bookService.loadBooks().subscribe({
            next: (data) => {
                const books: Book[] = data.objReturnObject;
                this.books = books;
                console.log('Books loaded:', books);
            },
            error: (error) => {
                console.error('Error loading books:', error);
            }
        });
    }
}