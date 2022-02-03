import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentPageComponent } from './post-comment-page.component';

describe('PostCommentPageComponent', () => {
  let component: PostCommentPageComponent;
  let fixture: ComponentFixture<PostCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
