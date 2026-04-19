// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [MatProgressSpinnerModule, MatToolbarModule,
        MatButtonModule, MatIconModule, MatExpansionModule, MatDialogModule,
        MatMenuModule, MatCardModule, RouterModule
    ],
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.css'],
})
export class AppComponent { }