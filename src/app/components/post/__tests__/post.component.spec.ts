import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { HackerNewsPublicService } from '../../../../service/hackernews-api.service';
import { HackerNewsPost } from '../../../models/app.models';
import { PostComponent } from '../post.component';

describe('PostComponent', () => {
  let fixture: ComponentFixture<PostComponent>;
  let component: PostComponent;
  let mockRoute: any;
  let mockService: jasmine.SpyObj<HackerNewsPublicService>;

  beforeEach(async () => {
    const paramMap$ = new BehaviorSubject({
      get: (key: string) => (key === 'item' ? 123 : null),
    });

    mockRoute = { paramMap: paramMap$ };
    mockService = jasmine.createSpyObj('HackerNewsPublicService', ['getPost']);
    mockService.getPost.and.returnValue(of({ id: 123, title: 'Test Post' }));

    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: HackerNewsPublicService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call HackerNewsPublicService.getPost() with the correct id on init', (done) => {
    component.ngOnInit();

    component.rawFiles$.subscribe((data) => {
      expect(mockService.getPost).toHaveBeenCalledWith(123);
      expect(data).toEqual({ id: 123, title: 'Test Post' } as HackerNewsPost);
      done();
    });
  });

  it('should react to new paramMap values and fetch new posts', (done) => {
    component.ngOnInit();

    const newParamMap = { get: (key: string) => (key === 'item' ? 999 : null) };
    (mockRoute.paramMap as BehaviorSubject<any>).next(newParamMap);

    mockService.getPost.and.returnValue(of({ id: 999, title: 'Updated Post' }));

    component.rawFiles$.subscribe((data) => {
      expect(mockService.getPost).toHaveBeenCalledWith(999);
      expect(data).toEqual({ id: 999, title: 'Updated Post' } as HackerNewsPost);
      done();
    });
  });
});
