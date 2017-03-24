import { Component, Input } from '@angular/core';
import { IPost } from './post.d';

@Component({
  selector: 'post-dialog',
  template: `<app-dialog [(settings)]="createPostSettigns"
    [(data)]="newPost">
    <section class="c-app__input_group">
      <label for="post-title" class="c-app__label">Title</label>
      <input
        id="post-title"
        type="text"
        class="c-app__input_text"
        [ngModel]="newPost.title"
        (ngModelChange)="handleTitleChanged($event)"
      />
    </section>
    <section class="c-app__input_group">
      <label for="post-body" class="c-app__label">Body</label>
      <textarea
        id="post-body"
        type="text"
        class="c-app__input_text c-app__input_text--multiline"
        [ngModel]="newPost.body"
        (ngModelChange)="handleBodyChanged($event)"
      ></textarea>
    </section>
  </app-dialog>`,
})
export class PostDialogComponent {
  @Input() createPostSettigns: any;
  @Input() newPost: IPost;

  handleBodyChanged(value: string) {
    this.createPostSettigns.bodyChanged(value);
  }

  handleTitleChanged(value: string) {
    this.createPostSettigns.titleChanged(value);
  }
}
