import { TestBed } from '@angular/core/testing';

import { QuilljsService } from './quilljs.service';

describe('QuilljsService', () => {
  let service: QuilljsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuilljsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
