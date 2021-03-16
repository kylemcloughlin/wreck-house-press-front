import {React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import md5 from 'md5';
import { useCookies } from "react-cookie";
import loginStyles from '../styles/SignIn.module.css';

const SignIn =() => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["bearer"]);
  const handleSignIn = async (event) => {
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
          }
  }).catch((error) => {
    console.log(error);
  });


  }
  
  return (<div>
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