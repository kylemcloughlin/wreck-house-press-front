import {React, useState, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import axios from 'axios';
import styles from '../styles/Reset.module.css';
import loginStyles from '../styles/Login.module.css';

import md5 from 'md5';
import { useSpring, animated } from 'react-spring';


export default function ResetPassword() {
  let [complete, setComplete] = useState(false);
  let [mes, setMessage] = useState(false);
  let [completeMes, setCompleteMessage] = useState(false);
  let [stepOne, setStepOne] = useState(false)
  let [recoveryToken, setRecoveryToken] =  useState("")
  let router = useRouter();
   const props = useSpring({
     height: mes ? 120 : 0,
     transform: 'translate3d(0,0,0)',
     width: '100%',
     display: 'flex',
     flexDirection: 'column',
     overflow: 'hidden',
     opacity: '.6',


     config: {
       duration: 400
     },

   })
    const completeProps = useSpring({
      height: completeMes ? 120 : 0,
      transform: 'translate3d(0,0,0)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      opacity: '.6',


      config: {
        duration: 400
      },

    })
  let handleReset = (e) => {
    e.preventDefault();
    let {token} = e.target;
   
      setRecoveryToken(token.value)
      axios.post(`${process.env.BACKEND_URL}/token_check`, {
        token: token.value,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status == 200) {        
          token.value = "";
          setStepOne(true)
          setCompleteMessage("Token: Accepted, Please Pick a Password you haven't previously used.")
      }
                  }).catch((error) => {
                      setMessage('token not valid or expired. Try generating a new token.')
                    })
                  
    }

    const handlePassword = (e) => {
       e.preventDefault();
       let {password, passwordConfirmation} = e.target;
        if ( password.value.length < 8) {
          setMessage('password Must be at least 8 characters long')



        }
        else if (password.value !== passwordConfirmation.value ) {
          setMessage('Passwords dont Match!')

        } else {
          axios.post(`${process.env.BACKEND_URL}/reset`, {
              token: recoveryToken,
              password: md5(password.value),
              password_confirmation: md5(passwordConfirmation.value)
            }, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
              console.log(response)
              if (response.status == 200) {
                setComplete(true)
              }
            }).catch((error) => {
              console.log(error);
            })

        }


      console.log(password.value)
    } 
                  
     const handleClick = (e) => {
        e.preventDefault();
        router.replace('/login')
     }

    const handleError = () => {
    setTimeout(function () { setMessage(false)}, 2000);
  
  }    
  const handleComplete = () => {
    setTimeout(function () { setCompleteMessage(false)}, 2000);
  
  }  
  useEffect(() => {
      
  if (mes) {
        handleError()

  }
   if (completeMes) {
     handleComplete()

   }

      
  },[mes, completeMes]);



  if(complete) {
          return (<div  className={styles.container}>
                      <div className={styles.titleHolder}>
                          <h1 className={styles.title}>Reset Password: Complete</h1>
                      </div>
                      <div className={styles.resetMess}><i>Your password has been reset, click</i> <button onClick={handleClick}className={styles.here}>here</button> <i>to login</i></div>
                  </div>)
  }
      
 return (<div  className={styles.container}>
        <animated.div style={completeProps} className={loginStyles.complete}>
        <p className={loginStyles.message}>{completeMes}</p>
      </animated.div> 
       <animated.div style={props} className={loginStyles.error}>
        <p className={loginStyles.message}>{mes}</p>
      </animated.div> 
      <div className={styles.titleHolder}>
            <h1 className={styles.title}>Reset Password</h1>
      </div>

      {stepOne ? (
      <form onSubmit={handlePassword}>
      <ul>
        <li>
          <label htmlFor="password">Password</label>     
          <br/>
          <input  name="password" type="password" placeholder="Password" required />
        </li>
        <li>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>        
          <br/>
          <input  name="passwordConfirmation" type="password" placeholder="Confirm Password" required />
        </li>        
        </ul>
        <div >
          <button className={styles.btn}>RESET</button>
        </div>
      </form>   

      ) : (

        <form onSubmit={handleReset}>
        <ul>
        <li>
        <label htmlFor="token">Token</label>
        <br/>
        <input name="token" type="token"   placeholder="Token" required />
        </li>
        </ul>
        <div >
        <button className={styles.btn}>RESET</button>
        </div>
        </form>
        )}
        
        </div>)
}