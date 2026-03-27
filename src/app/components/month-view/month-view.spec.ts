import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewComponent } from './month-view';

describe('MonthView', () => {
  let component: MonthViewComponent;
  let fixture: ComponentFixture<MonthViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
