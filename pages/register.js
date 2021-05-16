import Head from 'next/head';
import Link from 'next/link';
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
  const [sent, setSent] = useState(false)
  const [recovery, setRecovery] = useState(false)
  const  [complete, setComplete] = useState(false)
  const [registered, setRegistered] = useState(false)

  let classCondit= complete ? (loginStyles.complete): (loginStyles.error)
  const [mes, setMessage] = useState('')
          const props = useSpring({
            height: mes ? 150 : 0,
            transform: 'translate3d(0,0,0)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: '.6',
    
  
            config: {
              duration: 400
            },
           
          })
           const completeProps = useSpring({
            height: '150',
            transform: 'translate3d(0,0,0)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            opacity: '.6',
            color: 'black',
  
            config: {
              duration: 400
            },
           
          })
  const  propsCondit = complete ? (completeProps):(props)
  const registerUser = async event => {
    let test = event.target.password.value.split("")
    event.preventDefault()
    if (md5(event.target.password.value) != md5(event.target.password_confirmation.value) ) {
      setMessage("Passwords do not match!")
    
    } else if (test.length < 7) {
        setMessage("Password must be 8 characters long!")
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
        setRegistered(true)
          setCookie("Bearer", result.token, {
            path: "/",
            maxAge: 36000, // Expires after 1hr
            sameSite: true,
          })
               setTimeout(function () {  router.replace('/subscribe') }, 3000);
               setTimeout(function () { router.reload(); }, 4000);
      }
      if (result.status === 422) {
        setMessage("Email already taken, pleae try another!");
      }

    }
    
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
              maxAge: 36000, // Expires after 1hr
              sameSite: true,
            })
 
          handleSignIn(response.data.token)
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
    setTimeout(function () { setMessage(false)}, 3000);
  }   
  
  const handlePasswordRecovery = (e) =>  {

    setRecovery(true)
  
    
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
      setSent('true')
  }).catch((error) => {
  
  });


    }

  useEffect((ctx) => {
 
        const {Bearer} = parseCookies(ctx);

        if (Bearer) {
         router.replace("/");
        

        }
      if (mes) {
        handleError()

      }


      
      },[mes, sent]);
    let Register = () => {
      return(
        <div className={loginStyles.holder}>
        <h4 className={loginStyles.recoveryTitle}><i>Your Account a has actived, a confirmation was sent to the email provided and you will be redirected to the subscription page shortly</i></h4>
        </div>
      )
    }
      let element = sent ? (<div><i>an email has been sent to the email associated with the account.</i></div>) : (
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
      )

  if (recovery) {
    return ( <div className={loginStyles.mainContainer}>
<div className={loginStyles.loginDiv}>
 <h3 className={loginStyles.recoveryTitle}>Password Recovery</h3>
      {element}
  </div>
    </div>)
  }


  return (
    <div className={loginStyles.mainContainer}>
      <animated.div style={props} className={classCondit}>
        <p className={loginStyles.message}>{mes}</p>
      </animated.div> 
    
 
    <div className={loginStyles.loginDiv}>
  
    <img src='/images/Masthead-2021.png' className={loginStyles.loginImg}/>
  
    <div className={loginStyles.underline}/>
         {registered ? (<Register/>) : (      
         <div className={loginStyles.holder}>
            <form onSubmit={registerUser} className={loginStyles.register}>
            <h3 className={loginStyles.registerHead}>Register Here</h3>
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
            <Link  href="/login">
              <button className={loginStyles.registerButton } onClick={handlePasswordRecovery}>Alreadt Registered? Login Here</button>
            </Link>
    <button className={loginStyles.forgotButton } onClick={handlePasswordRecovery}>Forgot Your Password?</button>
    </div>
    )}
    </div>
  </div>
  )
}
  