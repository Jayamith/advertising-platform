import { TestBed } from '@angular/core/testing';

import { LandDataServiceService } from './land-data-service.service';

describe('LandDataServiceService', () => {
  let service: LandDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
