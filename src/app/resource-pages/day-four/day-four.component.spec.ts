import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayFourComponent } from './day-four.component';

describe('DayFourComponent', () => {
  let component: DayFourComponent;
  let fixture: ComponentFixture<DayFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
