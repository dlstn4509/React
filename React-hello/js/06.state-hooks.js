const { useState, useRef, useMemo, useCallback, useEffect, use } = React;

const List = ({ value }) => {
  return <li className="mb-2 py-2 border-bottom">{value}</li>;
};

// const Title = (props) => {
//   return <h1 className="my-5">{props.title}</h1>;
// };
const Title = ({ title }) => {
  // props에서 title을 구조분해할당
  return <h1 className="my-3 fa-2x">{title}</h1>;
};

const Search = ({ changeInput, changeForm }) => {
  const queryRef = useRef(null);
  const onChange = (e) => {
    changeInput(queryRef.current.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changeForm(queryRef.current.value);
    queryRef.current.value = '';
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        ref={queryRef}
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
  const [title, setTitle] = useState(''); // title = 초기값, setTitle = 변할값
  const [lists, setLists] = useState([]);
  const changeInput = (value) => {
    setTitle(value);
  };
  const changeForm = (value) => {
    setLists([value, ...lists]);
  };

  return (
    <div className="container">
      <Title title={title} />
      <Search changeInput={changeInput} changeForm={changeForm} />
      <ul className="border rounded my-3 p-3">
        {lists.map((v, i) => (
          <List value={v} key={i} />
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
