import { TestBed } from '@angular/core/testing';

import { Tipos } from './tipos';

describe('Tipos', () => {
  let service: Tipos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tipos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
