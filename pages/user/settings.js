import { parseCookies, destroyCookie } from 'nookies';
import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import SignIn from '../../components/CheckOutSignIn';
import axios from 'axios';
import md5 from 'md5';
import styles from '../../styles/Settings.module.css';
import UpdateEmail from '../../components/userSettings/updateEmail.js';
import UpdatePassword from '../../components/userSettings/updatePassword.js';
import DeleteAccount from '../../components/userSettings/deleteAccount.js';
import CancelSubscription from '../../components/userSettings/cancelSubscription.js';

export default function Settings(ctx) {  
const router = useRouter();
const {Bearer} = parseCookies(ctx);
const [complete, setComplete] = useState(false)
const [message, setMessage] = useState("")
const handleEmail = (e) => {
  e.preventDefault();
console.log(e)
let {email, emailConfirm} = e.target;
console.log(email.value)
    if(email.value != emailConfirm.value) {
          alert('Emails do not match, Try again!');
      
    } else {
      let data = { update: 'email',
                   email: email.value,
                  }
                  
                  sendPut(data)

  }
  
} 
const handlePassword = (e) => {
  e.preventDefault();
  let {password, newPassword, newPasswordConfirm} = e.target;
  let test = newPassword.value.split("");
  if (newPassword.value != newPasswordConfirm.value) {
          alert('Passwords do not match, Try again!');

  } else if (test.length < 7) {
    alert("Password must be 8 characters long!")
  } else {

    let data = { update: 'password',
    new_password: md5(newPassword.value),
    new_password_confirm: md5(newPasswordConfirm.value)
  }
  
  sendPut(data)
  
}
  
}
const handleDelete= (e) => {
  e.preventDefault();
  let {password, email, passwordConfirm} = e.target;
  let data = { 
               email: email.value,
               password: md5(password.value)
              }
  
              sendDelete(data)

}
const handleCancel = (e) => {
  e.preventDefault();
  let {email, password} = e.target;
  let data = {
    email: email.value,
    password: md5(password.value),          
    }
  axios.delete(`${process.env.BACKEND_URL}/cancel`, {
      data: {
        data
      }
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log("hittittiti", res)
         if (res.status === 200) {
           setComplete(true)

           setMessage('subscription has been canceled')
         }
     
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        alert('email or password are incorrect, please try again');

      }
       if (err.response.status === 404) {
         alert('There is no subscription associated with this account.');

       }
      
    })


}

const sendPut = (x) => {
      axios.get(`${process.env.BACKEND_URL}/logged_in`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'none',
            "Authorization": Bearer
          }
        })
        .then(res => { 
          let id = res.data.id
          axios.put(`${process.env.BACKEND_URL}/users/${id}`, {
                x
          }, {
              withCredentials: true,
               headers: {
      'Content-Type': 'application/json'
       }
      }).then(res => {
        if(res.status === 200){
          setComplete(true)
           if (x.update === 'email') {
          setMessage('email has been updated');

        } else {
          setMessage('password has been updated');
            
        }


        }
      }).catch((error)=>{
        if (x.update === 'email') {
          alert('This email is unavailable, please try another!');

        } 
        //  console.log(error.response.status);
        //  console.log(error.response.headers);
      })
        })

}
const sendDelete = (x) => {
      axios.get(`${process.env.BACKEND_URL}/logged_in`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'none',
            "Authorization": Bearer
          }
        })
        .then(res => { 
          let id = res.data.id
          axios.delete(`${process.env.BACKEND_URL}/users/${id}`, {
                data: {x}
          }, {
              withCredentials: true,
               headers: {
      'Content-Type': 'application/json'
       }
      }).then(res => {
        console.log("SEND DELETE", res)
           if (res.status === 200) {
             setComplete(true)
          setMessage('account hase been deleted');
            
            destroyCookie(null, "Bearer",{ path: '/'})
            //  setTimeout
           }
      }).catch((err)=>{
        if (err.response.status === 422) {
          alert('email or password are incorrect, please try again');
            }
        console.log(err);
      })
    }).catch((error) => {
      console.log(error);
        });

}

useEffect((ctx) => {
  
},[]);
  
  if (!Bearer) {
  
    return (<div className={styles.container}>
            <h1>User Settings</h1>
            <SignIn/>
          </div> )
}
 
if (complete) {
  setTimeout(function () { router.replace("/")}, 3000);
  return( <div className={styles.container}>
          <span>Confirmed! your {message}, if you will be redirected shortly...</span>
         </div>)
}
  
  return (<div className={styles.container}>
            <h1>User settings</h1>
            <div className={styles.underline}/>
            <ul>
               <UpdateEmail handleEmail={handleEmail} message={message}/>
               <UpdatePassword handlePassword={handlePassword} message={message}/>
               <DeleteAccount handleDelete={handleDelete} message={message}/>
               <CancelSubscription handleCancel={handleCancel} message={message}/>
            </ul>
          </div> )
}