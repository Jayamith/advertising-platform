import { TestBed } from '@angular/core/testing';

import { SparepartDataServiceService } from './sparepart-data-service.service';

describe('SparepartDataServiceService', () => {
  let service: SparepartDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparepartDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
