import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainareaComponent } from './admin-mainarea.component';

describe('AdminMainareaComponent', () => {
  let component: AdminMainareaComponent;
  let fixture: ComponentFixture<AdminMainareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
