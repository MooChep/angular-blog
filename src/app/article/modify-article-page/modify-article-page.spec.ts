import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyArticlePage} from './modify-article-page';

describe('ModifyArticlePage', () => {
  let component: ModifyArticlePage;
  let fixture: ComponentFixture<ModifyArticlePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyArticlePage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModifyArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
