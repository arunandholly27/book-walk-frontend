// src/app/app.component.ts
import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CalendarComponent],
    template: '<app-calendar></app-calendar>',
    styleUrls: ['./app.css'],
})
export class AppComponent { }