import { itemsFetchEpic } from '../posts/posts-epic';
import { combineEpics, Epic } from 'redux-observable';

export default combineEpics(itemsFetchEpic) as Epic<{}, {}>;
