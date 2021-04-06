import {React, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Reset.module.css';
import md5 from 'md5';

export default function ResetPassword() {
  let [complete, setComplete] = useState(false)
  let handleReset = (e) => {
    e.preventDefault();
    let {token, password, passwordConfirmation} = e.target;


    axios.post(`${process.env.BACKEND_URL}/reset`, {
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
                if (response.data.status === 200) {
                        // console.log('posted', response.data)
                        setComplete(true)
                }
                  }).catch((error) => {
                      console.log(error);
                    })
                  
                  }
                  
     
  if(complete) {
          return (<div  className={styles.container}>
                    <h1>complete</h1>
                  </div>)
  }
      
 return (<div  className={styles.container}>
      <div className={styles.titleHolder}>
            <h1 className={styles.title}>Reset Password</h1>
      </div>
       {/* <animated.div style={props} className={loginStyles.error}>
        <p className={loginStyles.message}>{mes}</p>
      </animated.div>  */}
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