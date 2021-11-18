// componentDidMount, componentDidUpdate
const { Component, createRef } = React;
const { render } = ReactDOM;
const postURL = 'https://jsonplaceholder.typicode.com/posts';
const userURL = 'https://jsonplaceholder.typicode.com/users';

// a ? (b ? 'b' : 'a') : 'c';

class Search extends Component {
  brClose = { right: '1em', cursor: 'pointer' };
  state = {
    query: '',
  };
  queryRef = createRef();
  onChange = (e) => {
    // this.setState({query: this.queryRef.current.value})
    this.setState({ query: e.target.value });
    this.props.changeInput(e.target.value);
  };
  onClose = (e) => {
    this.setState({ query: '' });
    this.queryRef.current.focus();
    // document.querySelector('#input').focus();
    this.props.changeInput('');
  };
  render() {
    return (
      <form className="my-4 d-flex align-items-center position-relative">
        <h3 className="mr-3 font-weight-bold flex-shrink-0">검색어 : </h3>
        <input
          onChange={this.onChange}
          ref={this.queryRef}
          className="form-control"
          autoFocus
          value={this.state.query}
          placeholder="검색할 단어를 적어주세요."
          id="input"
        />
        {this.state.query.length ? (
          <i
            className="fa fa-times position-absolute"
            style={this.brClose}
            onClick={this.onClose}
          />
        ) : (
          ''
        )}
      </form>
    );
  }
}

class Lists extends Component {
  caret = { cursor: 'pointer' };
  state = {
    sort: 'asc',
  };
  onChangeSort = (e) => {
    this.setState({ sort: e.target.dateSet['sort'] });
    this.props.changeSort(e.target.dateSet['sort']);
  };
  onChangeDesc = (e) => {
    this.setState({ sort: 'desc' });
    this.props.changeSort('desc');
  };
  onChangeASC = (e) => {
    this.setState({ sort: 'asc' });
    this.props.changeSort('asc');
  };
  render() {
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
              {this.state.sort === 'asc' ? (
                <i
                  className="fa fa-caret-down"
                  onClick={this.onChangeDesc}
                  style={this.caret}
                ></i>
              ) : (
                <i
                  className="fa fa-caret-up"
                  onClick={this.onChangeASC}
                  style={this.caret}
                ></i>
              )}
            </th>
            <th>제목</th>
            <th>작성자</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {this.props.posts.map((post, idx) => (
            <List post={post} key={idx} />
          ))}
        </tbody>
      </table>
    );
  }
}

class List extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.post.id}</td>
        <td>{this.props.post.title}</td>
        <td>{this.props.post.name}</td>
        <td>{this.props.post.body}</td>
      </tr>
    );
  }
}

class App extends Component {
  state = {
    query: '',
    allPosts: [],
    searchPosts: [],
  };
  changeInput = (value) => {
    this.setState({
      searchPosts: this.state.allPosts.filter(
        (post) => post.title.includes(value) | post.body.includes(value)
      ),
    });
  };
  changeSort = (value) => {
    this.setState({
      searchPosts:
        value === 'asc'
          ? _.sortBy(this.state.searchPosts, 'id')
          : _.sortBy(this.state.searchPosts, 'id').reverse(),
    });
  };
  async componentDidMount() {
    // React가 주는 함수, vue에서 created 와 같다
    try {
      const { data: posts } = await axios.get(postURL);
      const { data: users } = await axios.get(userURL);
      posts.forEach((post) => {
        let [{ name }] = users.filter((user) => user.id === post.userId);
        post.name = name;
      });
      this.setState({
        ...this.state,
        allPosts: [...posts],
        searchPosts: [...posts],
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="container">
        <Search changeInput={this.changeInput} />
        <Lists posts={this.state.searchPosts} changeSort={this.changeSort} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
