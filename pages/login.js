import Head from 'next/head';
import loginStyles from '../styles/login.module.css';

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
    console.log(result)
    console.log(document.cookie)
  }

  return (
    <div className={loginStyles.loginDiv}>
    <form onSubmit={registerUser}>
      <label htmlFor="name">Name</label>
      <input name="email" type="email"  required />
      <input  name="password" type="password"  required />
      <input  name="password_confirmation" type="password"  required />
      <button type="submit">Register</button>
    </form>
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