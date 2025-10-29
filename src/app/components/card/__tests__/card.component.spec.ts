import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HackerNewsPublicService } from '../../../../service/hackernews-api.service';
import { mockPost } from '../../../mocks/mocks';
import { CardComponent } from '../card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockService: jasmine.SpyObj<HackerNewsPublicService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HackerNewsPublicService', ['getPost']);
    mockService.getPost.and.returnValue(of(mockPost));

    await TestBed.configureTestingModule({
      imports: [CardComponent, RouterTestingModule],
      providers: [{ provide: HackerNewsPublicService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPost() when post input changes', () => {
    component.post = 1;
    component.ngOnChanges({
      post: { currentValue: 1, previousValue: null, firstChange: true, isFirstChange: () => true },
    });
    expect(mockService.getPost).toHaveBeenCalledWith(1);
  });

  it('should set postData$ observable when post input changes', (done) => {
    component.post = 1;
    component.ngOnChanges({
      post: { currentValue: 1, previousValue: null, firstChange: true, isFirstChange: () => true },
    });

    component.postData$.subscribe((data) => {
      expect(data).toEqual(mockPost);
      done();
    });
  });

  it('should render post data when observable emits', async () => {
    component.post = 1;
    component.ngOnChanges({
      post: { currentValue: 1, previousValue: null, firstChange: true, isFirstChange: () => true },
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.mat-mdc-card-title')?.textContent).toContain(mockPost.title);
    expect(compiled.querySelector('a')?.getAttribute('href')).toBe(mockPost.url);
  });
});
