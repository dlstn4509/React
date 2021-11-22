/* 
1. action은 동기(sync)다
2. action은 객체여야 한다
3. dispatch()는 action을 reducer에 전달하는 행위
4. middleware에서 action을 가공해야 한다. -> redux-thunk, redux-saga
5. 비동기 action은 function으로 만들에서 middleware에서 실행한다.
*/

import axios from 'axios';

const logIn = (payload) => {
  return async (dispatch, getState) => {
    try {
      let userUrl = 'https://jsonplaceholder.typicode.com/users?username=';
      userUrl += payload;
      const { data } = await axios.get(userUrl);
      dispatch(logOn(data[0]));
    } catch (err) {
      console.log(err);
    }
  };
};

const logOn = (payload) => {
  return {
    type: 'LOG_ON',
    payload, //
  };
};

const logOut = (payload) => {
  return {
    type: 'LOG_OUT',
    payload, //
  };
};
export { logIn, logOut };
