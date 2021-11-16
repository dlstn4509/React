/******************** 1. createElement ********************/
// const el = React.createElement('태그명', { 속성 }, 'value');

const app = document.querySelector('#app');
const el = React.createElement(
  'h1',
  { className: 'title', title: 'head-title' },
  'Hello React!'
);

ReactDOM.render(el, app);

console.log(React);

/******************** 2. jsx ********************/
ReactDOM.render(<h1 className="title">Hello React2</h1>, app);

/******************** 3. jsx ********************/
let username = 'dlstn4509';
let el2 = (
  <h1 className="title">
    Hello, {username} world
    <small className="ml-3">feat. React</small>
  </h1>
);
ReactDOM.render(el2, app);
