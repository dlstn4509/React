import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import state from './states';
import reducer from './reducers';

// 임의 Middleware
const myMiddleware = (store) => (next) => (action) => {
  try {
    console.log('미들웨어, 액션 가공');
    next(action);
  } catch (err) {
    next(err);
  }
};
// thunkMiddleware
// const thunkMiddleware = (store) => (next) => (action) => {
//   if (typeof action === 'function') {
//     return action(store.dispatch, store.getState);
//   }
//   next(action);
// };

// 1. middleware 합치기, precess.env.NODE_ENV === 'development'
// const enhancer = composeWithDevTools(applyMiddleware(myMiddleware));
// 2. middleware 합치기, precess.env.NODE_ENV === 'production'
// const enhancer = compose(applyMiddleware(myMiddleware));

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(myMiddleware, thunk))
    : composeWithDevTools(applyMiddleware(myMiddleware, thunk));

const store = createStore(reducer, state, enhancer);
export default store;
