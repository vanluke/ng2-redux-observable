import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './post';
import { PostsService } from './posts.service';
import { itemsFetchPosts } from './posts-epic';

@Component({
  selector: 'posts',
  template: `<section class="c-posts">
    <div *ngFor="let post of posts">
      <post [post]="post"></post>
    </div>
  </section>
  `,
  providers: [PostsService],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(@Inject('store') private store: any) {
  }

  ngOnInit() {
    const { dispatch } = this.store;
    this.subscription = this.store.subscribe(() => {
      const { items } = this.store.getState();
      this.posts = items.posts || [];
      this.isLoading = items.isLoading;
      this.error = items.error;
    });
    dispatch(itemsFetchPosts());
  }

  ngOnDestroy() {
    this.subscription();
  }

  subscription: any;
  posts: IPost[];
  isLoading: boolean = false;
  error: any;
}
