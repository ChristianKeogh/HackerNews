import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { FeedService } from '../../../../service/current-feed.service';
import { HackerNewsPublicService } from '../../../../service/hackernews-api.service';
import { mockIds } from '../../../mocks/mocks';
import { NewsListComponent } from '../news-list.component';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let mockFeedService: jasmine.SpyObj<FeedService>;
  let mockHackerNewsService: jasmine.SpyObj<HackerNewsPublicService>;

  beforeEach(async () => {
    mockFeedService = jasmine.createSpyObj('FeedService', ['currentFeed']);
    mockHackerNewsService = jasmine.createSpyObj('HackerNewsPublicService', ['getPostsFromFeed']);

    await TestBed.configureTestingModule({
      imports: [NewsListComponent],
      providers: [
        { provide: FeedService, useValue: mockFeedService },
        { provide: HackerNewsPublicService, useValue: mockHackerNewsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPostsFromFeed with the current feed and update allPostIds', fakeAsync(() => {
    mockFeedService.currentFeed.and.returnValue('top');
    mockHackerNewsService.getPostsFromFeed.and.returnValue(of(mockIds));

    component.fetchPosts();

    tick();

    expect(mockFeedService.currentFeed).toHaveBeenCalled();
    expect(mockHackerNewsService.getPostsFromFeed).toHaveBeenCalledWith('top');
    expect(component.displayedPosts().length).toBe(25);
    expect(component.displayedPosts()[0]).toBe(1);
    expect(component.displayedPosts()[24]).toBe(25);
  }));

  it('should return correct displayedPosts for current page', fakeAsync(() => {
    mockFeedService.currentFeed.and.returnValue('top');
    mockHackerNewsService.getPostsFromFeed.and.returnValue(of(mockIds));

    component.fetchPosts();

    tick();

    let displayed = component.displayedPosts();
    expect(displayed.length).toBe(25);
    expect(displayed[0]).toBe(1);
    expect(displayed[24]).toBe(25);

    component.currentPage.set(1);
    displayed = component.displayedPosts();
    expect(displayed.length).toBe(25);
    expect(displayed[0]).toBe(26);
    expect(displayed[24]).toBe(50);
  }));

  it('should update currentPage when onPageChange is called', () => {
    const event: PageEvent = { pageIndex: 2, pageSize: 25, length: 100 };
    component.onPageChange(event);
    expect(component.currentPage()).toBe(2);
  });
});
