import { combineReducers } from 'redux'; // combineReducers -> redux 메서드
import user from './user-reducer';
import post from './post-reducer';
const reducer = combineReducers({ user, post });

export default reducer;
