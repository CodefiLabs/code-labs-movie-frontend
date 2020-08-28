import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayFiveComponent } from './day-five.component';

describe('DayFiveComponent', () => {
  let component: DayFiveComponent;
  let fixture: ComponentFixture<DayFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
