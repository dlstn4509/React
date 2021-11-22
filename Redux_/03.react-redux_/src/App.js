import { useCallback } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from './store/actions/user-act';

function App() {
  const { user, post } = useSelector((state) => state);
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(logIn('Antonette'));
  };

  const onLogout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header" style={{ color: 'white' }}>
        <div>
          {user.isLogIn && user.username
            ? user.username + '로그인 되었습니다.'
            : '로그인 하세요'}
        </div>
        <div>
          <div onClick={onLogin}>로그인</div>
          <div onClick={onLogout}>로그아웃</div>
        </div>
      </header>
    </div>
  );
}

export default App;
