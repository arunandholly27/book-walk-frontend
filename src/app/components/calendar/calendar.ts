//  src/app/components/calendar/calendar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewComponent } from '../month-view/month-view';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, MonthViewComponent, MatToolbar, MatButton, RouterLink],
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.css'],
})
export class CalendarComponent {
    currentDate = new Date();

    changeMonth(offset: number) {
        this.currentDate = new Date(
            this.currentDate.setMonth(this.currentDate.getMonth() + offset)
        );
    }
}