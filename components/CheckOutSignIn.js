import {React, useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import loginStyles from '../styles/SignIn.module.css';

const CheckOutSignIn =() => {
  const [clicked, setClicked] = useState(false)
  const handleClick= (e) => {
    e.preventDefault();
      setClicked(!clicked);
  }
  
  return (<div>
            {clicked ? (<SignIn/>) : (<SignUp/>)}
            <button onClick={handleClick} className={loginStyles.switchBtn}>{clicked ? ('Not registered? Sign up here.') : ('Sign in here.')}</button>
        </div>)
}

export default CheckOutSignIn