import { TestBed } from '@angular/core/testing';

import { DatosentidadService } from './datosentidad.service';

describe('DatosentidadService', () => {
  let service: DatosentidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosentidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
