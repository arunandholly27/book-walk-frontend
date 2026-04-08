// src/app/app.component.ts
import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CalendarComponent, MatProgressSpinnerModule, MatToolbarModule,
        MatButtonModule, MatIconModule
    ],
    template: '<app-calendar></app-calendar>',
    styleUrls: ['./app.css'],
})
export class AppComponent { }