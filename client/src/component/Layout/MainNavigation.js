import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import userStore from '../../stores';

const MainNavigation = () => {
  // const authCtx = useContext(AuthContext);
  const getUserid = userStore(state => state.userId);
  const isLoggedin = userStore(state => state.isLoggedin);
  const logOutAction = userStore(state => state.logoutUserid);
  const cleanFavourite = userStore (state => state.cleanFavourite)
  // const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    logOutAction()
    cleanFavourite()
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedin && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {/* {isLoggedIn && (
            <li>
              <Link to='/changepassword'>Change Password</Link>
            </li>
          )} */}
          {isLoggedin && (
            <li>
              <Link to='/apply'>Apply</Link>
            </li>
          )}
            <li>
              <Link to='/cases'>Cases</Link>
            </li>
          {isLoggedin && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <Link to='/favourite'>Favourite</Link>
            </li>
          )}
          {isLoggedin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
