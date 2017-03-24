import { Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemsFetchPosts } from './posts-epic';
import { IPost } from './post.d';
import './_post-details.scss';

@Component({
  selector: 'post-details',
  template: `<article class="c-post-details">
    <h3 class="c-post-details__header c-post-details__header--main">
      {{ post.title }}
    </h3>
    <p class="c-post-details__body">{{ post.body }}</p>
  </article>`,
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  constructor(@Inject('store') private store: any,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const { dispatch } = this.store;
    this.routerSubscription =
      this.route.params.subscribe(params => {
        this.subscription = this.store.subscribe(() => {
          const { items } = this.store.getState();
          this.post = items.posts.find(post =>
              post.id === parseInt(params.id, 10));
        });
        dispatch(itemsFetchPosts());
    });

  }

  ngOnDestroy() {
    this.subscription();
    this.routerSubscription.unsubscribe();
  }

  post: IPost;
  routerSubscription: any;
  subscription: any;
}
