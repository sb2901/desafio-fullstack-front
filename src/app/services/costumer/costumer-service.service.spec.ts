import { TestBed } from '@angular/core/testing';

import { CostumerServiceService } from './costumer-service.service';

describe('CostumerServiceService', () => {
  let service: CostumerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
