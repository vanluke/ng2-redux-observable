import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
} from './posts-consts';
import { IPost } from './post';

interface IItemsState {
  posts: IPost[];
  isLoading: boolean;
  error: any;
}

interface IItemAction {
  type: string;
  payload: any;
}

const initialState = <IItemsState> {
  posts: [],
  isLoading: false,
};

export default (state = initialState, action: IItemAction) : IItemsState => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.posts,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default: return { ...state };
  }
};
