import { TestBed } from '@angular/core/testing';

import { PdfcreatorService } from '../../pdfcreator.service';

describe('PdfcreatorService', () => {
  let service: PdfcreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfcreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
