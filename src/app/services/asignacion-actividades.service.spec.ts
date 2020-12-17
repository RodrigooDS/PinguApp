import { TestBed } from '@angular/core/testing';

import { AsignacionActividadesService } from './asignacion-actividades.service';

describe('AsignacionActividadesService', () => {
  let service: AsignacionActividadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionActividadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
