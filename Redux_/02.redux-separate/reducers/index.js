const { combineReducers } = require('redux'); // combineReducers -> redux 메서드
const user = require('./user-reducer');
const post = require('./post-reducer');
const reducer = combineReducers({ user, post });

console.log(reducer);

module.exports = reducer;
