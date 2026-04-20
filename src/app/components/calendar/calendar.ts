//  src/app/components/calendar/calendar.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewComponent } from '../month-view/month-view';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSmImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { UserService } from '../../services/user/user-service';
import { MatIcon } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HelperService } from '../../services/helper/helper-service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, MonthViewComponent, MatToolbar, MatButton,
         RouterModule, MatCard, MatCardContent, MatCardTitle, MatCardHeader,
         MatProgressSpinner, FontAwesomeModule, MatSlideToggleModule, FormsModule],
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.css'],
})
export class CalendarComponent implements OnInit {
    currentDate = new Date();
    scores: any[] = [];
    faCrown = faCrown;
    isLoading = true;
    isToggled = false;

    constructor(private userService: UserService, public helperService: HelperService,
        private router: Router, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.isToggled = this.helperService.isToggled();
        this.loadScores();
    }

    ngOnChanges() {
        this.loadScores();
    }
    
    nav() {
        this.router.navigate(['/statistics']);
    }

    toggle() {
        this.isToggled = !this.isToggled;
        this.helperService.isToggled.set(this.isToggled);
    }

    changeMonth(offset: number) {
        this.currentDate = new Date(
            this.currentDate.setMonth(this.currentDate.getMonth() + offset)
        );
    }

    loadScores() {
        this.userService.getScores().subscribe({
            next: (data) => {
                this.scores = data.objReturnObject;
                const maxScore = Math.max(...this.scores.map(score => score.bdFinalScore));
                this.scores.forEach(score => {
                    score.isLeader = score.bdFinalScore === maxScore;
                });
                console.log('Scores loaded:', this.scores);
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error) => {
                console.error('Error loading scores:', error);
                this.isLoading = false;
            }
        });
    }
}