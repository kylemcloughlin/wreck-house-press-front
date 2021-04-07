import {React, useEffect, useState } from 'react';
import loginStyles from '../styles/SignIn.module.css';
import { useRouter } from 'next/router';
import md5 from 'md5';
import { useCookies } from "react-cookie";
import { useSpring, animated } from 'react-spring';
const SignUp =() => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["bearer"])
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
  const registerUser = async event => {
    let test = event.target.password.value.split("")
    event.preventDefault()
     if (md5(event.target.password.value) != md5(event.target.password_confirmation.value)) {
       setMessage("Passwords do not match!")

     } else if (test.length < 7) {
       setMessage("Password must be 8 characters long!")
     } else {
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
        if (result.status === 422) {
          setMessage("Email already taken, pleae try another!");
        }

        
   }
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
            <h1 className={loginStyles.title}>Register</h1>
      </div>
       <animated.div style={props} className={loginStyles.error}>
        <p className={loginStyles.message}>{mes}</p>
      </animated.div> 
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