import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHome } from './news-home.component';

describe('NewsHome', () => {
  let component: NewsHome;
  let fixture: ComponentFixture<NewsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsHome],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
