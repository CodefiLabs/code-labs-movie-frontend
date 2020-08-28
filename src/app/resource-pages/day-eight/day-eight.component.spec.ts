import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEightComponent } from './day-eight.component';

describe('DayEightComponent', () => {
  let component: DayEightComponent;
  let fixture: ComponentFixture<DayEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
