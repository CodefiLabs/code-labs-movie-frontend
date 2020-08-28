import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTenComponent } from './day-ten.component';

describe('DayTenComponent', () => {
  let component: DayTenComponent;
  let fixture: ComponentFixture<DayTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
