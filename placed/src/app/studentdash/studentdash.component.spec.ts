import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdashComponent } from './studentdash.component';

describe('StudentdashComponent', () => {
  let component: StudentdashComponent;
  let fixture: ComponentFixture<StudentdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
