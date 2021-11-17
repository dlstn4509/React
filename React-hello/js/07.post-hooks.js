const { useState, useRef, useMemo, useCallback, useEffect, use } = React;
const postURL = 'https://jsonplaceholder.typicode.com/posts';
const userURL = 'https://jsonplaceholder.typicode.com/users';

const Search = ({ changeInput }) => {
  const [query, setQuery] = useState('');
  const onChange = (e) => {
    setQuery(e.target.value);
    changeInput(e.target.value);
  };
  const onClose = (e) => {
    setQuery('');
    changeInput('');
  };
  return (
    <form className="my-4 d-flex align-items-center position-relative">
      <h3 className="mr-3 font-weight-bold flex-shrink-0">검색어 : </h3>
      <input
        type="text"
        className="form-control"
        autoFocus
        placeholder="검색할 단어를 적어주세요."
        onChange={onChange}
        value={query}
      />
      {query.length ? (
        <i
          className="fa fa-times position-absolute"
          style={{ right: '1em', cursor: 'pointer' }}
          onClick={onClose}
        ></i>
      ) : (
        ''
      )}
    </form>
  );
};

const Lists = ({ posts }) => {
  const [sort, setSort] = useState('asc');
  const onChangeDesc = () => {
    setSort('desc');
  };
  const onChangeAsc = () => {
    setSort('asc');
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
            <i
              onClick={onChangeDesc}
              className="fa fa-caret-down"
              style={{ cursor: 'pointer' }}
            ></i>
            <i
              onClick={onChangeAsc}
              className="fa fa-caret-up"
              style={{ cursor: 'pointer' }}
            ></i>
          </th>
          <th>제목</th>
          <th>작성자</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((v, i) => (
          <List posts={v} key={i} />
        ))}
      </tbody>
    </table>
  );
};

const List = ({ posts }) => {
  return (
    <tr>
      <td>{posts.id}</td>
      <td>{posts.title}</td>
      <td>{posts.name}</td>
      <td>{posts.body}</td>
    </tr>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  useEffect(async () => {
    const { data: posts } = await axios.get(postURL);
    const { data: users } = await axios.get(userURL);
    posts.forEach((post) => {
      let [{ name }] = users.filter((user) => user.id === post.userId);
      post.name = name;
    });
    setAllPosts(posts);
  });
  const changeInput = (value) => {
    setQuery(value);
    setSearchPosts(allPosts.filter((post) => post.title.includes(value)));
  };
  return (
    <div>
      <Search changeInput={changeInput} />
      <Lists posts={query === '' ? allPosts : searchPosts} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
