import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  NEW_POST_TITLE_CHANGED,
  NEW_POST_BODY_CHANGED,
  NEW_POST_DIALOG_TOGGLE,
  NEW_POST_CREATE,
} from './posts-consts';
import { IPost } from './post';

interface IItemsState {
  posts: IPost[];
  isLoading: boolean;
  error: any;
  newPost: IPost;
  createPostSettigns: any;
}

interface IItemAction {
  type: string;
  payload: any;
}

const initialState = <IItemsState> {
  posts: [],
  newPost: {},
  isLoading: false,
  createPostSettigns: {
    isVisible: false,
  },
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
    case NEW_POST_TITLE_CHANGED:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          title: action.payload.title,
        },
      };
    case NEW_POST_BODY_CHANGED:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          body: action.payload.body,
        },
      };
    case NEW_POST_DIALOG_TOGGLE:
      return {
        ...state,
        createPostSettigns: {
          ...state.createPostSettigns,
          isVisible: action.payload.isVisible,
        }
      };
    case NEW_POST_CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
      };
    default: return { ...state };
  }
};
