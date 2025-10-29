import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedService } from '../../../../service/current-feed.service';
import { NavbarComponent } from '../navbar.component';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let feedService: jasmine.SpyObj<FeedService>;
  let router: Router;

  beforeEach(async () => {
    const feedServiceSpy = jasmine.createSpyObj('FeedService', [], {
      currentFeed: {
        set: jasmine.createSpy('set'),
      },
    });

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [{ provide: FeedService, useValue: feedServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    feedService = TestBed.inject(FeedService) as jasmine.SpyObj<FeedService>;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('redirectOrSetFeed()', () => {
    it('should set the feed without navigation when on root route', () => {
      spyOnProperty(router, 'url', 'get').and.returnValue('/');

      component['redirectOrSetFeed']('top');

      expect(feedService.currentFeed.set).toHaveBeenCalledWith('top');
    });

    it('should navigate to root when not on root route', () => {
      spyOnProperty(router, 'url', 'get').and.returnValue('/news');
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      component['redirectOrSetFeed']('new');

      expect(feedService.currentFeed.set).toHaveBeenCalledWith('new');
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('onClick* methods', () => {
    it('should call redirectOrSetFeed("top")', () => {
      spyOn<any>(component, 'redirectOrSetFeed');
      component.onClickTop();
      expect(component['redirectOrSetFeed']).toHaveBeenCalledWith('top');
    });

    it('should call redirectOrSetFeed("new")', () => {
      spyOn<any>(component, 'redirectOrSetFeed');
      component.onClickNew();
      expect(component['redirectOrSetFeed']).toHaveBeenCalledWith('new');
    });

    it('should call redirectOrSetFeed("best")', () => {
      spyOn<any>(component, 'redirectOrSetFeed');
      component.onClickBest();
      expect(component['redirectOrSetFeed']).toHaveBeenCalledWith('best');
    });
  });

  describe('template', () => {
    it('should render three toggle buttons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('mat-button-toggle'));
      expect(buttons.length).toBe(3);
    });

    it('should have "Submit" and "Login" buttons on the right', () => {
      const rightButtons = fixture.debugElement.queryAll(By.css('.navbar__right a[matButton]'));
      const buttonTexts = rightButtons.map((el) => el.nativeElement.textContent.trim());
      expect(buttonTexts).toEqual(['Submit', 'Login']);
    });
  });
});
