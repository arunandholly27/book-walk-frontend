import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTable } from './entry-table';

describe('EntryTable', () => {
  let component: EntryTable;
  let fixture: ComponentFixture<EntryTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryTable],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
