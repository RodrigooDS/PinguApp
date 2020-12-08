import { TestBed } from '@angular/core/testing';

import { RepasosService } from './repasos.service';

describe('RepasosService', () => {
  let service: RepasosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
