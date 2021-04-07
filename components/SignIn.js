import {React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import md5 from 'md5';
import { useCookies } from "react-cookie";
import loginStyles from '../styles/SignIn.module.css';
import { useSpring, animated } from 'react-spring';
const SignIn =() => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["bearer"]);
  const [mes, setMessage] = useState('')
  const props = useSpring({
            height: mes ? 80 : 0,
            transform: 'translate3d(0,0,0)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: '.6',
            // transition: mes ? '' :'2ss ease',
  
            config: {
              duration: 400
            },
           
          })
  
  const handleSignIn = async (event) => {
    event.preventDefault()
    axios.post(`${process.env.BACKEND_URL}/sessions`, {
          email: event.target.email.value,
          password: md5(event.target.password.value)
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if (response.data.logged_in) {
            setCookie("Bearer", response.data.token, {
              path: "/",
              maxAge: 3600, // Expires after 1hr
              sameSite: true,
            })
 
          // handleSignIn(response.data.token)
                // router.replace("/");
            router.reload();

    
          } else {
            
            setMessage(`${response.data}`);
          }
          }).catch((error) => {
            console.error(error)
            setMessage("Incorrect email or Password, Please try again!");
          });


  }
   function handleError() {
    setTimeout(function () { setMessage(false)}, 2000);
  }    
  useEffect(() => {
      
  if (mes) {
        handleError()

  }


      
  },[mes]);


  return (<div>
     <div className={loginStyles.titleHolder}>
            <h1 className={loginStyles.title}>Sign In</h1>
      </div>
      <animated.div style={props} className={loginStyles.error}>
        <p className={loginStyles.message}>{mes}</p>
      </animated.div>
           <form onSubmit={handleSignIn} className={loginStyles.signIn}>
      <ul className={loginStyles.formList}>
        <li>
          <label htmlFor="name">Name</label>
          <br/>
          <input name="email" type="email" placeholder="Email" required />
        </li>
        <li>
          <label htmlFor="password">Password</label>     
          <br/>
          <input  name="password" type="password"  placeholder="Password" required />
        </li>      
      </ul>
      <div className={loginStyles.wrapper}>
        <button type="submit" className={loginStyles.btn}>Sign In</button>
      </div>
    </form>
            
        </div>)
}

export default SignIn