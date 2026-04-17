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

    constructor(private eventService: EventService, private userService: UserService,
         private entryService: EntryService, private bookService: BookService) { }

    ngOnInit() {
        this.days = this.getDaysInMonth();
        this.loadUsers();
        this.loadEvents();
        this.getEventDates();
        this.loadBooks();
    }
    testBooks() {
        this.entryService.searchBooks().subscribe({
            next: (data) => {
                console.log('Books searched:', data);
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
        this.loadEvents();
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

    loadEvents() {
        this.days.forEach((day) => {
            const dateString = day.toISOString().split('T')[0];
            this.events[dateString] = this.eventService.getEvents(dateString);
        });
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

    addEvent(day: Date) {
        const event = prompt('Enter event:');
        if (event) {
            const dateString = day.toISOString().split('T')[0];
            this.eventService.addEvent(dateString, event);
            this.loadEvents();
        }
    }

    removeEvent(day: Date, event: string) {
        const dateString = day.toISOString().split('T')[0];
        this.eventService.removeEvent(dateString, event);
        this.loadEvents();
    }
    checkEvent(day: Date) {
        // const dateString = day.toISOString().split('T')[0];
        // const arr = this.eventService.getEvents(dateString);
        // return arr.length;
        const formattedDate = formatDate(day, 'yyyy-MM-dd', 'en-US');
        if (this.eventDates?.includes(formattedDate)) {
            return true;
        }
        return false;
    }
    showModal(date: Date) {
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
                console.log('Books loaded:', books);
            },
            error: (error) => {
                console.error('Error loading books:', error);
            }
        });
    }
}