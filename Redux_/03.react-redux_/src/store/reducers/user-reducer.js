const init = {
  isLogIn: false,
  username: '',
  data: {},
};

const userReducer = (prevState = init, { type, payload }) => {
  switch (type) {
    case 'LOG_OUT':
      return {
        ...prevState,
        isLogIn: false,
        username: '',
        data: {},
      };
    case 'LOG_ON':
      return {
        ...prevState,
        isLogIn: true,
        username: payload.username,
        data: payload,
      };
    default:
      return prevState;
  }
};

export default userReducer;
