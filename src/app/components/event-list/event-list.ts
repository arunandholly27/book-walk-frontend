//  src/app/components/event-list/event-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryTable } from '../entry-table/entry-table';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-event-list',
    standalone: true,
    imports: [CommonModule, EntryTable, MatIcon],
    templateUrl: './event-list.html',
    styleUrls: ['./event-list.css'],
})
export class EventListComponent {
    @Input() selectedDate!: Date;
    @Output() removeEvent = new EventEmitter<string>();
    @Output() addEvent = new EventEmitter<Date>();

    onRemoveEvent() {
        this.removeEvent.emit();
    }

    onAddEvent(date: Date) {
        console.log('Adding event for date:', date);
        this.addEvent.emit(date);
    }
    ngOnChanges() {}
}