import { TestBed } from '@angular/core/testing';

import { Hackernewsapi } from './hackernewsapi';

describe('Hackernewsapi', () => {
  let service: Hackernewsapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hackernewsapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
