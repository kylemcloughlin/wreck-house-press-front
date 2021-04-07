import {React, useState, useEffect } from 'react';
import { useRouter, Router } from 'next/router';
import axios from 'axios';
import styles from '../styles/Reset.module.css';
import md5 from 'md5';
import { useSpring, animated } from 'react-spring';



export default function LegacyReset() {
  let [complete, setComplete] = useState(false);
  let router = useRouter();
  
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

  let handleReset = (e) => {
    e.preventDefault();
    let {token, password, passwordConfirmation} = e.target;

    if ( password.value.length < 8) {
      setMessage('password Must be at least 8 characters long')

    }
    if (password.value !== passwordConfirmation.value ) {
      setMessage('Passwords dont Match!')

    }
    axios.post(`${process.env.BACKEND_URL}/legacy`, {
                    token: token.value,
                    password: md5(password.value),
                    password_confirmation: md5(passwordConfirmation.value)
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
              }
            })
            .then((response) => {
                console.log('response', response)
                console.log(response.status)
                if (response.status === 200) {
                        setComplete(true)
                }
                  }).catch((error) => {
                       if (error.response.status === 404) {
                          setMessage("something went wrong, please make sure you've copied the complete token")
                        
                        }
                    })
                  
                  }
                  



     const handleClick = (e) => {
        e.preventDefault();
        router.replace('/login')
     }


  
        function handleError() {
    setTimeout(function () { setMessage(false)}, 2000);
  }    
  useEffect(() => {
      
  if (mes) {
        handleError()

  }


      
  },[mes, complete]);



  if(complete) {
          return (<div  className={styles.container}>
                      <div className={styles.titleHolder}>
                          <h1 className={styles.title}>Reset Password: Complete</h1>
                      </div>
                      <div className={styles.resetMess}><i>Your password has been reset, click</i> <button onClick={handleClick}className={styles.here}>here</button> <i>to login</i></div>
                  </div>)
  }
      
 return (<div  className={styles.container}>
      <div className={styles.titleHolder}>
            <h1 className={styles.title}>Legacy User Transfer</h1>
      </div>
       <animated.div style={props} className={styles.error}>
        <p className={styles.message}>{mes}</p>
      </animated.div> 
     <form onSubmit={handleReset}>
      <ul>
        <li>
          <label htmlFor="token">Token</label>
          <br/>
          <input name="token" type="token"   placeholder="Token" required />
        </li>
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
            
        </div>)

}
