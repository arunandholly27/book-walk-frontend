import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-entry-form',
  imports: [ReactiveFormsModule, MatFormField, MatSelect, MatOption],
  templateUrl: './entry-form.html',
  styleUrl: './entry-form.css',
})
export class EntryForm implements OnInit {
  @Input() selectedDate: Date | null = null;
  @Input() users: any[] = [];
  @Output() submitEntry = new EventEmitter<any>();

  entryForm = new FormGroup({
    entryDate: new FormControl<string | null>(this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : null, Validators.required),
    user: new FormControl('', Validators.required),
    book: new FormControl(''),
    pages: new FormControl(0),
    walk: new FormControl(''),
    miles: new FormControl(0)
  });

  onSubmit() {
    if (this.entryForm.valid) {
      this.submitEntry.emit(this.entryForm.value);
    }
  }

  ngOnInit(): void {
    if (this.selectedDate) {
      const displayDate = this.selectedDate.getMonth() + 1 + '/' + this.selectedDate.getDate() + '/' + this.selectedDate.getFullYear();
      this.entryForm.patchValue({
        entryDate: displayDate
      });
      this.entryForm.get('entryDate')?.disable();
    }
  }

}
