const { useState, useRef, useMemo, useCallback, useEffect, use } = React;

const List = ({ lists }) => {
  return <li className="mb-2 py-2 border-bottom">{lists}</li>;
};

// const Title = (props) => {
//   return <h1 className="my-5">{props.title}</h1>;
// };
const Title = ({ title }) => {
  // props에서 title을 구조분해할당
  return <h1 className="my-3 fa-2x">{title}</h1>;
};

const Search = ({ changeTitle, changeLists }) => {
  const onChange = (e) => {
    changeTitle(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changeLists(e.target.query.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        className="form-control"
        type="text"
        name="query"
        autoFocus
      />
    </form>
  );
};

const App = () => {
  const [title, setTitle] = useState('');
  const [lists, setLists] = useState('');
  const changeTitle = (value) => {
    setTitle(value);
  };
  const changeLists = (value) => {
    setLists(value);
  };
  return (
    <div className="container">
      <Title title={title} />
      <Search changeTitle={changeTitle} changeLists={changeLists} />
      <ul className="border rounded my-3 p-3">
        <List lists={lists} />
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
