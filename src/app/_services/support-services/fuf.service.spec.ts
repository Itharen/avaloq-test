import { TestBed } from '@angular/core/testing';

import { FufService } from './fuf.service';

describe('FufService', () => {
  let service: FufService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FufService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
