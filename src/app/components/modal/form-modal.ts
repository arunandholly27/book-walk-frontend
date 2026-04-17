import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntryForm } from '../entry-form/entry-form';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-modal',
  imports: [EntryForm, ReactiveFormsModule, MatDialogModule,
      MatIconModule, MatButtonModule],
  templateUrl: './form-modal.html',
  styleUrl: './form-modal.css',
})
export class FormModal implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() selectedDate: Date | null = null;
  @Input() users: any[] = [];
  
  ngOnInit() {
  }

  closeModal() {
    this.close.emit();
  }

  handleSubmit(entryData: any) {
    console.log('Entry submitted:', entryData);
    this.closeModal();
  }
}
