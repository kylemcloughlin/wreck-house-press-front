import Head from 'next/head';
import loginStyles from '../styles/Login.module.css';

export default function Login() {
  

  


  const registerUser = async event => {
    event.preventDefault()
  
    const res = await fetch('http://localhost:3001/users', {
      body: JSON.stringify({
      user:  {
          
          email: event.target.email.value,
          password: event.target.password.value,
          password_comfirmation: event.target.password_confirmation.value,
        }

      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()

    // result.user => 'Ada Lovelace'
    // console.log(result)
    // console.log(document.cookie)
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
    <form onSubmit={registerUser} className={loginStyles.signIn}>
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











  // const handleSignUp = (e) => {
  //     console.log('hit')
  // }

  // return(<div className={loginStyles.loginDiv}>
  //   <img src='/images/Masthead-2021.png'/>
  //   <div/>
  // <div className={loginStyles.signInDiv}>
  //   <label>Email:</label>
  //   <br/>
  //   <input type='email' className={loginStyles.email}/>
  //   <br/>
  //   <label> Password: </label>
  //   <br/>
  //   <input type="password"className={loginStyles.password}/>
  //   <br/>  
  //      <label> Confirm Password: </label>
  //   <br/>
  //   <input type="password"className={loginStyles.password}/>
  //   <br/>  
  //   <button onClick={handleSignUp}>register</button>
  // </div>
    {/* <div className={loginStyles.registerDiv}>
      <h6>Dont Have An Account?</h6>
       <button>Sign In With Google</button>
        <br/>
       <button>Sign In With Facebook</button>
        <br/>
       <button>Sign In</button>
  // </div> */}

  // </div>)
}

// export default Login