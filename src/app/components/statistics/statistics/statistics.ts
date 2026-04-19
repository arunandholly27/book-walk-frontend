import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { HelperService } from '../../../services/helper/helper-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  imports: [RouterModule, MatToolbar, MatSlideToggle, MatButton, FormsModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  isToggled = false;

  constructor(private router: Router, public helperService: HelperService) { }

  ngOnInit() {
    this.isToggled = this.helperService.isToggled();
  }

 toggle() {
    this.isToggled = !this.isToggled;
    this.helperService.isToggled.set(this.isToggled);
  }

  nav() {
    this.router.navigate(['/calendar']);
  }
}
