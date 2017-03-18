import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
} from './posts-consts';
import { IPost } from './post';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';
import { PostsService } from './posts.service';


const postsService = new PostsService();

interface IAction {
  type: string;
  payload?: any;
}

export const itemsFetchPosts = (): IAction => ({
  type: FETCH_POSTS
});

export const itemsFetchPostsSuccess = (posts): IAction => ({
  type: FETCH_POSTS_SUCCESS,
  payload: {
    posts
  },
});

export const itemsFetchPostsFailed = (error): IAction => ({
  type: FETCH_POSTS_SUCCESS,
  payload: {
    error
  },
});

export const itemsFetchEpic = (action$, store) => {
  return action$.ofType(itemsFetchPosts().type)
    .mergeMap(() => {
      return postsService.getPosts()
        .map((posts) => {
          return itemsFetchPostsSuccess(posts);
        });
    });
};
