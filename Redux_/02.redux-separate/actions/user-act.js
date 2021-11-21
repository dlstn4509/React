const logIn = (payload) => {
  return {
    type: 'LOG_IN',
    payload, // userid
  };
};

const logOut = (payload) => {
  return {
    type: 'LOG_OUT',
    payload, //
  };
};

module.exports = { logIn, logOut };
