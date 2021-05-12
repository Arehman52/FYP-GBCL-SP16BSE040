import { TestBed } from '@angular/core/testing';

import { CpasService } from './cpas.service';

describe('CpasService', () => {
  let service: CpasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
