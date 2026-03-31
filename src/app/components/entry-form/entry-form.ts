import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry-form',
  imports: [ReactiveFormsModule],
  templateUrl: './entry-form.html',
  styleUrl: './entry-form.css',
})
export class EntryForm {
  entryForm = new FormGroup({
    entryDate: new FormControl(new Date(), Validators.required),
    user: new FormControl('', Validators.required),
    book: new FormControl(''),
    pages: new FormControl(0),
    walk: new FormControl(''),
    miles: new FormControl(0)
  });

  @Output() submitEntry = new EventEmitter<any>();

  onSubmit() {
    if (this.entryForm.valid) {
      this.submitEntry.emit(this.entryForm.value);
    }
  }

}
