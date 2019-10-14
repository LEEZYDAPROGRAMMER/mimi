import { TestBed } from '@angular/core/testing';

import { MimiService } from './mimi.service';

describe('MimiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MimiService = TestBed.get(MimiService);
    expect(service).toBeTruthy();
  });
});
