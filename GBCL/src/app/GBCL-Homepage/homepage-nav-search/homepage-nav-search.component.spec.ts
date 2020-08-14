import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageNavSearchComponent } from './homepage-nav-search.component';

describe('HomepageNavSearchComponent', () => {
  let component: HomepageNavSearchComponent;
  let fixture: ComponentFixture<HomepageNavSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageNavSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageNavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
