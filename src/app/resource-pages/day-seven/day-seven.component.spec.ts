import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySevenComponent } from './day-seven.component';

describe('DaySevenComponent', () => {
  let component: DaySevenComponent;
  let fixture: ComponentFixture<DaySevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
