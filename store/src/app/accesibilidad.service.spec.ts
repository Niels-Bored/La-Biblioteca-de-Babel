import { TestBed } from '@angular/core/testing';

import { AccesibilidadService } from './accesibilidad.service';

describe('AccesibilidadService', () => {
  let service: AccesibilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesibilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
