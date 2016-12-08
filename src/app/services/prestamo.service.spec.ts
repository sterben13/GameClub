/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrestamoService } from './prestamo.service';

describe('PrestamoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestamoService]
    });
  });

  it('should ...', inject([PrestamoService], (service: PrestamoService) => {
    expect(service).toBeTruthy();
  }));
});
