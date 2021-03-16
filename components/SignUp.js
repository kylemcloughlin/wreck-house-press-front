import {React, useEffect, useState } from 'react';
import loginStyles from '../styles/SignIn.module.css';
import { useRouter } from 'next/router';
import md5 from 'md5';
import { useCookies } from "react-cookie";

const SignUp =() => {
const router = useRouter();
const [cookie, setCookie] = useCookies(["bearer"])
  const registerUser = async event => {
    event.preventDefault()
    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
      body: JSON.stringify({
      user:  {
          
          email: event.target.email.value,
          password: md5(event.target.password.value),
          password_comfirmation: md5(event.target.password_confirmation.value),
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

             router.reload();

      }    
  }


  return (<div>
          <form onSubmit={registerUser}>
      <ul className={loginStyles.formList}>
        <li>
          <label htmlFor="name">Name</label>
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
            
        </div>)
}

export default SignUp