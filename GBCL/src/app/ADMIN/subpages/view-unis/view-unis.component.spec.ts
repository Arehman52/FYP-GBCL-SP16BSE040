import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnisComponent } from './view-unis.component';

describe('ViewUnisComponent', () => {
  let component: ViewUnisComponent;
  let fixture: ComponentFixture<ViewUnisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUnisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
