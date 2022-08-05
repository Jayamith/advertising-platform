import { TestBed } from '@angular/core/testing';

import { SparepartDataService } from './sparepart-data.service';

describe('SparepartDataService', () => {
  let service: SparepartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparepartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
