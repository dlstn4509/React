/* 
1. 부모가 자식에게 값을 보낼때는 속성으로 보낸다
2. 자식은 props로 값을 받는다
3. 자식이 부모에게 값을 보낼때는 이벤트로 보낸다.
*/

class List extends React.Component {
  render() {
    return <h2 className="my-2">{this.props.value}</h2>;
  }
}

class Title extends React.Component {
  render() {
    return <h1 className="fa-2x my-5">{this.props.title}</h1>;
  }
}

class Search extends React.Component {
  state = {
    원본: [],
    변경: [],
  };
  onChangeInput = (e) => {
    this.props.onChangeTitle(e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[(name = 'query')].value);
    this.props.onChangeForm(e.target.query.value);
    e.target.query.value = '';
  };
  onClick = (e) => {
    this.setState({
      원본: ['원본'],
      변경: ['변경'],
    });
  };
  onClick2 = (e) => {
    this.setState({
      변경: ['변경1111111'],
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChangeInput}
          type="text"
          className="form-control"
          name="query"
          autoFocus
        />
        <button onClick={this.onClick}>asd</button>
        <button onClick={this.onClick2}>sss</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    title: '',
    lists: [],
  };
  changeTitle = (value) => {
    this.setState({
      // this 는 App, setState 는 React에서 상속받은 메서드
      ...this.state, // 현재의 state 값을 가져와서 뿌려줘야 댐, 없으면 state 전부다 바뀜
      title: value,
    });
  };
  changeForm = (value) => {
    this.setState({
      title: '',
      lists: [value],
    });
  };
  render() {
    return (
      <div className="container">
        <Title title={this.state.title} />
        <Search onChangeTitle={this.changeTitle} onChangeForm={this.changeForm} />
        <div className="my-4 border p-3">
          {this.state.lists.reverse().map((v, i) => (
            <List value={v} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));

/* 
1. 부모가 state 를 가진 함수를 먼저 보내고
2. 자식이 받아서 함수안에 실행하고
3. value 를 받은 부모가 적용할 자식한테 다시 보냄
*/
