import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayNineComponent } from './day-nine.component';

describe('DayNineComponent', () => {
  let component: DayNineComponent;
  let fixture: ComponentFixture<DayNineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
