import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GBCLHomepageComponent } from './gbcl-homepage.component';

describe('GBCLHomepageComponent', () => {
  let component: GBCLHomepageComponent;
  let fixture: ComponentFixture<GBCLHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GBCLHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GBCLHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
