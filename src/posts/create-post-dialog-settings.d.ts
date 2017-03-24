import { IPost } from './post.d';
import { IPostDialogSettings } from './post-dialog-settings.d';

export interface ICreatePostDialogSettings {
  createPostSettigns: IPostDialogSettings;
  newPost: IPost;
}
