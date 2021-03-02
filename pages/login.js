import Head from 'next/head';
import loginStyles from '../styles/login.module.css';

export default function Login() {

  return(<div className={loginStyles.loginDiv}>
    <img src='/images/Masthead-2021.png'/>
    <div/>
  <div className={loginStyles.signInDiv}>
    <label>Email:</label>
    <br/>
    <input type='email' className={loginStyles.email}/>
    <br/>
    <label> Password: </label>
    <br/>
    <input type="password"className={loginStyles.password}/>
    <br/>  
    <button>Sign In</button>
  </div>
    <div className={loginStyles.registerDiv}>
      <h6>Dont Have An Account?</h6>
       <button>Sign In With Google</button>
        <br/>
       <button>Sign In With Facebook</button>
        <br/>
       <button>Sign In</button>
  </div>

  </div>)
}

// export default Login