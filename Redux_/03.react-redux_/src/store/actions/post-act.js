const addPost = (payload) => {
  return {
    type: 'ADD_POST',
    payload, // { ... }
  };
};

const removePost = (payload) => {
  return {
    type: 'REMOVE_POST',
    payload, // id
  };
};

const postAction = { addPost, removePost };

export default postAction;
