import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UNIVERSITYComponent } from './university.component';

describe('UNIVERSITYComponent', () => {
  let component: UNIVERSITYComponent;
  let fixture: ComponentFixture<UNIVERSITYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UNIVERSITYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UNIVERSITYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
