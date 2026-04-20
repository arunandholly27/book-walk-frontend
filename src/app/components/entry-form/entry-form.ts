import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-entry-form',
  imports: [ReactiveFormsModule, MatFormField, MatLabel,
     MatSelect, MatOption, CommonModule, FormsModule, MatButton],
  templateUrl: './entry-form.html',
  styleUrl: './entry-form.css',
})
export class EntryForm implements OnInit {
  @Input() selectedDate: Date | null = null;
  @Input() users: any[] = [];
  @Input() books: any[] = [];
  @Output() submitEntry = new EventEmitter<any>();

  bookSelected: any = null;

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

  onSelectBook(event: any) {
    this.bookSelected = event.value;
    console.log('Selected book:', this.bookSelected);
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

  isFormValid(): boolean {
    if (this.entryForm.get('user')?.invalid || this.entryForm.get('entryDate')?.invalid) {
      return false;
    }
    if (this.entryForm.get('book')?.value && this.entryForm.get('pages')?.value) {
      return true;
    }
    else if (this.entryForm.get('walk')?.value && this.entryForm.get('miles')?.value) {
      return true;
    }
    return false;
  }
}
