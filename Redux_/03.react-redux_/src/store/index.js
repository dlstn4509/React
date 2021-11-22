import { createStore } from 'redux';

import state from './states';
import reducer from './reducers';

const store = createStore(reducer, state);
export default store;
