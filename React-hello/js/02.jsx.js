const app = document.querySelector('#app');
const user = [
  { name: '홍길동', age: '25' },
  { name: '홍길순', age: '32' },
  { name: '홍길만', age: '28' },
];
const el = <h1>Hello React</h1>;
const el2 = (
  <div>
    {/* 이게 jsx 주석 */}
    {/* jsx의 root는 하나의 태그로만 구성 */}
    {/* jsx에서는 표현식(삼항연상자, 한줄map, 한줄filter)만 가능 */}
    {/* jsx에서는 변수선언, 함수선언, if, for는 안됨 */}
    <ul>
      {user.map((v) => (
        <li>
          {v.name}
          <span className="mx-2">|</span>
          {v.age}
        </li>
      ))}
    </ul>
  </div>
);

ReactDOM.render(el2, app);
