import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import { IPost } from './post';

@Injectable()
export class PostsService {
    getPosts(): Observable<IPost[]> {
      const postsRequest = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET'
      })
      .then(response => response.json() as Promise<IPost[]>);
      return Observable.from(postsRequest);
    }
}
