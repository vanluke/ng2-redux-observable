import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './post';
import { PostsService } from './posts.service';
import {
  itemsFetchPosts,
  newPostDialogToggle,
  newPostTitleChanged,
  newPostBodyChanged,
  newPostCreate,
} from './posts-epic';
import './_posts.scss';
import { IPostDialogSettings } from './post-dialog-settings.d';
import { ICreatePostDialogSettings } from './create-post-dialog-settings';

@Component({
  selector: 'posts',
  template: `<section class="c-posts">
    <h3 class="c-posts__header c-posts__header--main c-posts--inline">Posts</h3>
    <section class="c-posts__create c-posts--inline">
      <button
        (click)="createPost()"
        class="c-posts__button c-posts__button--create">
        Create Post
      </button>
    </section>
    <div *ngFor="let post of posts">
      <post [post]="post"></post>
    </div>
    <post-dialog
      [createPostSettigns]="createPostSettigns"
      [newPost]="newPost">
    </post-dialog>
  </section>
  `,
  providers: [PostsService],
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(@Inject('store') private store: any) {
      this.createPostSettigns = <IPostDialogSettings>{
        isVisible: false,
        onCreate: this.onCreatePost,
        onClose: this.onCreatePostClose,
        titleChanged: this.onTitleChange,
        bodyChanged: this.onBodyChange,
        title: 'Create post',
        createText: 'Create',
      };
  }

  ngOnInit() {
    const { dispatch } = this.store;
    this.subscription = this.store.subscribe(() => {
      const { items } = this.store.getState();
      this.posts = items.posts || [];
      this.newPost = items.newPost;
      this.createPostSettigns = {
        ...this.createPostSettigns,
        ...items.createPostSettigns,
      };
      this.isLoading = items.isLoading;
      this.error = items.error;
    });
    dispatch(itemsFetchPosts());
  }

  ngOnDestroy() {
    this.subscription();
  }

  onCreatePostClose = (): void =>  {
    const { dispatch } = this.store;
    dispatch(newPostDialogToggle(false));
  }

  onTitleChange = (value: string): void => {
    const { dispatch } = this.store;
    dispatch(newPostTitleChanged(value));
  }

  onBodyChange = (value: string): void => {
    const { dispatch } = this.store;
    dispatch(newPostBodyChanged(value));
  }

  createPost() {
    const { dispatch } = this.store;
    dispatch(newPostDialogToggle(true));
  }

  onCreatePost = (): void => {
    const { dispatch } = this.store;
    dispatch(newPostDialogToggle(false));
    dispatch(newPostCreate({
      id: new Date().getTime(),
      ...this.newPost
    }));
  }

  createPostSettigns: IPostDialogSettings;
  newPost: IPost;
  subscription: any;
  posts: IPost[];
  isLoading: boolean = false;
  error: any;
}
