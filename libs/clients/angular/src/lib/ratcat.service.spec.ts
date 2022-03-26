import { TestBed } from '@angular/core/testing';

import { RatcatService } from './ratcat.service';

describe('RatcatService', () => {
  let service: RatcatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatcatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
