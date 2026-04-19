import { Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar';
import { EntryTable } from './components/entry-table/entry-table';
import { Statistics } from './components/statistics/statistics/statistics';

export const routes: Routes = [
    { path: 'calendar', component: CalendarComponent },
    {path: 'statistics', component: Statistics},
    { path: '', redirectTo: '/calendar', pathMatch: 'full' }
];
