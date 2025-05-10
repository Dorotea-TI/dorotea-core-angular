import { TestBed } from '@angular/core/testing';

import { DoroteaCoreService } from './dorotea-core.service';

describe('DoroteaCoreService', () => {
  let service: DoroteaCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoroteaCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
