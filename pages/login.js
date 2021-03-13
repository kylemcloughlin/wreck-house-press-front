import Head from 'next/head';
import loginStyles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import md5 from 'md5';
import { useCookies } from "react-cookie";

export default function Login({loggedIn}) {
  const router = useRouter()
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

            console.log(cookie)
            loggedIn(result.logged_in)
        router.push("/subscribe")


      }
    console.log(result)
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
      router.push("/")
      loggedIn(result.logged_in)
      
    } else {
      console.log('somthing went wrong?', response.data)
    }
  }).catch((error) => {
    console.log(error);
  });


  }
  
  
  
  return (
    <div className={loginStyles.mainContainer}>
  <div className={loginStyles.loginDiv}>
  
    <img src='/images/Masthead-2021.png' className={loginStyles.loginImg}/>
  
    <div className={loginStyles.underline}/>
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
        <button type="submit" className={loginStyles.regButton}>Register</button>
      </div>
    </form>
    <div className={loginStyles.verticalLine}/>
    <form onSubmit={signIn} className={loginStyles.signIn}>
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
        <button type="submit" className={loginStyles.signInButton}>Sign In</button>
      </div>
    </form>
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

  