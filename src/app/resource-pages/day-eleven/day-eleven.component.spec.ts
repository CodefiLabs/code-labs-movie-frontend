import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayElevenComponent } from './day-eleven.component';

describe('DayElevenComponent', () => {
  let component: DayElevenComponent;
  let fixture: ComponentFixture<DayElevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayElevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
