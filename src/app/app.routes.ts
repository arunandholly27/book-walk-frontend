import { Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar';
import { EntryTable } from './components/entry-table/entry-table';

export const routes: Routes = [
    { path: '', redirectTo: '/calendar', pathMatch: 'full' },
    { path: 'calendar', component: CalendarComponent },
    { path: 'entries', component: EntryTable }

];
