import userAction from './user-act';
import postAction from './post-act';
const combineAction = { ...userAction, ...postAction };
export default combineAction;
