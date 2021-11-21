const init = [];

const postReducer = (prevState = init, { type, payload }) => {
  switch (type) {
    case 'ADD_POST':
      return [...prevState, payload];
    case 'REMOVE_POST':
      return prevState.filter((v) => v.id !== payload);
    default:
      return prevState;
  }
};

module.exports = postReducer;
