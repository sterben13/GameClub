/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CopyService } from './copy.service';

describe('CopyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CopyService]
    });
  });

  it('should ...', inject([CopyService], (service: CopyService) => {
    expect(service).toBeTruthy();
  }));
});
