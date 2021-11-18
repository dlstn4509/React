const { useState, useRef, useEffect } = React;
const { render } = ReactDOM;
const postURL = 'https://jsonplaceholder.typicode.com/posts';
const userURL = 'https://jsonplaceholder.typicode.com/users';

const Search = ({ changeInput }) => {
  const styleClose = { right: '1em', cursor: 'pointer' };
  const [query, setQuery] = useState('');
  const queryRef = useRef(null);
  const onChange = (e) => {
    setQuery(e.target.value);
    changeInput(e.target.value);
  };
  const onClose = (e) => {
    setQuery('');
    queryRef.current.focus();
    changeInput('');
  };
  return (
    <form className="my-4 d-flex align-items-center position-relative">
      <h3 className="mr-3 font-weight-bold flex-shrink-0">검색어 : </h3>
      <input
        onChange={onChange}
        ref={queryRef}
        className="form-control"
        autoFocus
        value={query}
        placeholder="검색할 단어를 적어주세요."
        id="input"
      />
      {query.length ? (
        <i
          className="fa fa-times position-absolute"
          style={styleClose}
          onClick={onClose}
        />
      ) : (
        ''
      )}
    </form>
  );
};

const Lists = ({ changeSort, posts }) => {
  const styleCaret = { cursor: 'pointer' };
  const [sort, setSort] = useState('asc');
  const onChangeSort = (e) => {
    setSort(e.target.dateSet['sort']);
    changeSort(e.target.dateSet['sort']);
  };
  const onChangeDesc = (e) => {
    setSort('desc');
    changeSort('desc');
  };
  const onChangeASC = (e) => {
    setSort('asc');
    changeSort('asc');
  };
  return (
    <table className="table my-3">
      <colgroup>
        <col width="100" />
        <col />
        <col width="100" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>
            번호
            {sort === 'asc' ? (
              <i
                className="fa fa-caret-down"
                onClick={onChangeDesc}
                style={styleCaret}
              ></i>
            ) : (
              <i className="fa fa-caret-up" onClick={onChangeASC} style={styleCaret}></i>
            )}
          </th>
          <th>제목</th>
          <th>작성자</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, idx) => (
          <List post={post} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

const List = ({ post }) => {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.name}</td>
      <td>{post.body}</td>
    </tr>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const changeInput = (value) => {
    setSearchPosts(
      allPosts.filter((post) => post.title.includes(value) | post.body.includes(value))
    );
  };
  const changeSort = (value) => {
    setSearchPosts(
      value === 'asc'
        ? _.sortBy(searchPosts, 'id')
        : _.sortBy(searchPosts, 'id').reverse()
    );
  };

  useEffect(async () => {
    // componentDidMount;
    try {
      const { data: posts } = await axios.get(postURL);
      const { data: users } = await axios.get(userURL);
      posts.forEach((post) => {
        let [{ name }] = users.filter((user) => user.id === post.userId);
        post.name = name;
      });
      setAllPosts(posts);
      setSearchPosts(posts);
    } catch (err) {
      console.log(err);
    }
    return () => {
      // componentWillUnmount;
    };
  }, []); // update할 state
  return (
    <div className="container">
      <Search changeInput={changeInput} />
      <Lists posts={searchPosts} changeSort={changeSort} />
    </div>
  );
};

render(<App />, document.querySelector('#app'));
