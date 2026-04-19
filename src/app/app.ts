// src/app/app.component.ts
import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CalendarComponent, MatProgressSpinnerModule, MatToolbarModule,
        MatButtonModule, MatIconModule, MatExpansionModule, MatDialogModule,
        MatMenuModule, MatCardModule
    ],
    template: '<app-calendar></app-calendar>',
    styleUrls: ['./app.css'],
})
export class AppComponent { }