const { createStore } = require('redux');

/* state ********/
const states = {
  str: '',
  obj: {},
};

/* action creator ********/
// action은 객체다 - type, payload
const actStr = (payload) => {
  return {
    type: 'ACT_STR',
    payload,
  };
};

const actObj = (payload) => {
  return {
    type: 'ACT_OBJ',
    payload,
  };
};

/* reducer ********/
// 한개의 함수다.
const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case 'ACT_STR':
      return {
        ...prevState,
        str: payload,
      };
    case 'ACT_OBJ':
      return {
        ...prevState,
        obj: payload,
      };
    default:
      return prevState;
  }
};

/* store ********/
const store = createStore(reducer, states);
console.log(store);

/******************************************/

/* subscribe ********/
store.subscribe(() => {
  console.log('subscribe ==========');
  console.log(store.getState());
});

/* dispatch ********/
console.log('초기값 ==========');
console.log(store.getState());

store.dispatch({ type: 'ACT_STR', payload: 'B' });
store.dispatch(actStr('C'));
store.dispatch(actObj({ userid: 'booldook' }));
