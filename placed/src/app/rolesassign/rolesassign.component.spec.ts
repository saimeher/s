import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesassignComponent } from './rolesassign.component';

describe('RolesassignComponent', () => {
  let component: RolesassignComponent;
  let fixture: ComponentFixture<RolesassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
