import { TestBed } from '@angular/core/testing';

import { JournalServiceService } from './journal-service.service';

describe('JournalServiceService', () => {
  let service: JournalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
