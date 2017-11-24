import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthrangerComponent } from './monthranger.component';

describe('MonthrangerComponent', () => {
  let component: MonthrangerComponent;
  let fixture: ComponentFixture<MonthrangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthrangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthrangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
