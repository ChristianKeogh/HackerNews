import { TestBed } from '@angular/core/testing';
import { HackerNewsPublicService } from './hackernews-api.service';

describe('Hackernewsapi', () => {
  let service: HackerNewsPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackerNewsPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
