import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TEACHERComponent } from './teacher.component';

describe('TEACHERComponent', () => {
  let component: TEACHERComponent;
  let fixture: ComponentFixture<TEACHERComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TEACHERComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TEACHERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
