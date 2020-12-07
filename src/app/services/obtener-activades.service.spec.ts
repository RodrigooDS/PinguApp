import { TestBed } from '@angular/core/testing';

import { ObtenerActivadesService } from './obtener-activades.service';

describe('ObtenerActivadesService', () => {
  let service: ObtenerActivadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerActivadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
