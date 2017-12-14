import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdshortlistComponent } from './stdshortlist.component';

describe('StdshortlistComponent', () => {
  let component: StdshortlistComponent;
  let fixture: ComponentFixture<StdshortlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdshortlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdshortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
