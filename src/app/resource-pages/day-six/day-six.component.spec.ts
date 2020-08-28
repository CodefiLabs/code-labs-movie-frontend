import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySixComponent } from './day-six.component';

describe('DaySixComponent', () => {
  let component: DaySixComponent;
  let fixture: ComponentFixture<DaySixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
