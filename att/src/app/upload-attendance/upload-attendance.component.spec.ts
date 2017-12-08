import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAttendanceComponent } from './upload-attendance.component';

describe('UploadAttendanceComponent', () => {
  let component: UploadAttendanceComponent;
  let fixture: ComponentFixture<UploadAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
