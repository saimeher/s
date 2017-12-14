import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsattdeletionComponent } from './roundsattdeletion.component';

describe('RoundsattdeletionComponent', () => {
  let component: RoundsattdeletionComponent;
  let fixture: ComponentFixture<RoundsattdeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundsattdeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsattdeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
