import { Component, Input } from '@angular/core';
import { IPost } from './post';

@Component({
  selector: 'post',
  template: `<a class="c-posts__link" [routerLink]="['./', post.id]">
    {{ post.title }}
  </a>
`,
})
export class PostComponent {
  @Input() post: IPost;
}
