import { TestBed } from '@angular/core/testing';

import { LandDataService } from './land-data.service';

describe('LandDataService', () => {
  let service: LandDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
