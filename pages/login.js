import Head from 'next/head';
import loginStyles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import md5 from 'md5';
import { useCookies } from "react-cookie";
import { parseCookies } from 'nookies';
import {React, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';


export default function Login({handleSignIn, setLoggedIn}) {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["bearer"]);
  const [error, setError] = useState(false)
  const [recovery, setRecovery] = useState(false)

  const [mes, setMessage] = useState('')
          const props = useSpring({
            height: mes ? 150 : 0,
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

  const registerUser = async event => {

    event.preventDefault()
    if (md5(event.target.password.value) != md5(event.target.password_confirmation.value) ) {
      setMessage("Passwords do not match!")
    
    } else {

    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
      body: JSON.stringify({
      user:  {
          
          email: event.target.email.value,
          password: md5(event.target.password.value),
          password_confirmation:  md5(event.target.password_confirmation.value),
        }

      }),
      headers: {
        'Content-Type': 'application/json',
        
      },
      method: 'POST',
      withCredentials: true
    })

    const result = await res.json()
      if (result.logged_in) {
          setCookie("Bearer", result.token, {
            path: "/",
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
          })

            console.log(cookie)
             router.reload();


      }
      if (result.status === 422) {
        setMessage("Email already taken, pleae try another!");
      }

    }
    // console.log(document.cookie)
  }
    
  const signIn = async (event) => {
    event.preventDefault();
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
 
          handleSignIn(response.data.token)
                // router.replace("/");
                router.reload();

    
          } else {
            console.log('somthing went wrong?', response.data)
            setMessage(`${response.data}`);
          }
  }).catch((error) => {
    
    console.error(error)
    setMessage("Incorrect email or Password, Please try again!");
  });


  }
  
  function handleError() {
    setTimeout(function () { setMessage(false)}, 3000);
  }   
  
  const handlePasswordRecovery = (e) =>  {

    setRecovery(true)
  
    console.log('hit')
  }

    const resque= (e) => {
      e.preventDefault()
      let {email } = e.target;


axios.post(`${process.env.BACKEND_URL}/rescue`, {
          email: email.value,
          
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
   
  }).catch((error) => {
  
  });



      console.log(email.value)

    }

  useEffect((ctx) => {
 
        const {Bearer} = parseCookies(ctx);

        if (Bearer) {
         router.replace("/");
        console.log('hit')

        }
      if (mes) {
        handleError()

      }


        // console.log(Bearer, split)

      
      },[mes]);
  

  if (recovery) {
    return ( <div className={loginStyles.mainContainer}>
<div className={loginStyles.loginDiv}>
 <h3 className={loginStyles.recoveryTitle}>Password Recovery</h3>
  <form onSubmit={resque} className={loginStyles.register}>
      <ul className={loginStyles.formList}>
        <li>
          <label htmlFor="name">Last Email Associated With Account</label>
          <br/>
          <input name="email" type="email"   placeholder="Email" required />
        </li>
        </ul>
            <button type="submit" className={loginStyles.recoveryBtn}>Recover</button>
        </form>
  </div>
    </div>)
  }


  return (
    <div className={loginStyles.mainContainer}>
      <animated.div style={props} className={loginStyles.error}>
        <p className={loginStyles.message}>{mes}</p>
      </animated.div> 
    
 
    <div className={loginStyles.loginDiv}>
  
    <img src='/images/Masthead-2021.png' className={loginStyles.loginImg}/>
  
    <div className={loginStyles.underline}/>
         <div className={loginStyles.holder}>
    <form onSubmit={registerUser} className={loginStyles.register}>
      <ul className={loginStyles.formList}>
        <li>
          <label htmlFor="name">Email</label>
          <br/>
          <input name="email" type="email"   placeholder="Email" required />
        </li>
        <li>
          <label htmlFor="password">Password</label>     
          <br/>
          <input  name="password" type="password" placeholder="Password" required />
        </li>
        <li>
          <label htmlFor="password_confirmation">Password Confirmation</label>        
          <br/>
          <input  name="password_confirmation" type="password" placeholder="Confirm Password" required />
        </li>        
      </ul>
      <div className={loginStyles.wrapper}>
        <button type="submit" className={loginStyles.btn}>Register</button>
      </div>
    </form>
    <div className={loginStyles.verticalLine}/>
    <form onSubmit={signIn} className={loginStyles.signIn}>
        <ul className={loginStyles.formList}>
        <li>
          <label htmlFor="name">Email</label>
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
    <button className={loginStyles.forgotButton } onClick={handlePasswordRecovery}>forgot your password?</button>
    </div>
    </div>
  </div>
  )
}
  
  
  
  
  
  
  
  // const res = await fetch('http://localhost:3001/sessions',{  body: JSON.stringify({ user: { email: event.target.email.value,  password: event.target.password.value, } }),  
  // headers: {  'Content-Type': 'application/json' }, method: 'POST',
  // withCredentials: true})
    
    // const result = await res.json()
    
    // console.log(result.logged_in)




  // const handleSignUp = (e) => {
  //     console.log('hit')
  // }

  