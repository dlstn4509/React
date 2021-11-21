const init = {
  isLogIn: false,
  data: {},
};

const userReducer = (prevState = init, { type, payload }) => {
  switch (type) {
    case 'LOG_IN':
      return {
        ...prevState,
        isLogIn: payload.isLogIn,
        data: payload.data,
      };
    case 'LOG_OUT':
      return {
        ...prevState,
        isLogIn: false,
        data: {},
      };
    default:
      return prevState;
  }
};

module.exports = userReducer;
