//  src/app/components/event-list/event-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryTable } from '../entry-table/entry-table';

@Component({
    selector: 'app-event-list',
    standalone: true,
    imports: [CommonModule, EntryTable],
    templateUrl: './event-list.html',
    styleUrls: ['./event-list.css'],
})
export class EventListComponent {
    @Input() events!: string[];
    @Output() removeEvent = new EventEmitter<string>();

    onRemoveEvent(event: string) {
        this.removeEvent.emit(event);
    }
}