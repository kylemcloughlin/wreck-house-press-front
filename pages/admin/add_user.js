import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';


export default function addUser(ctx) {
  let [complete, setComplete] = useState(false)  
  let [admin, setAdmin] = useState(false)
  let [email, setEmail] = useState("")
  let [subscription, setSubscription] = useState(false)

  const router = useRouter();
  const handlePost = (e) => {
    e.preventDefault();
    if (subscription === false) {
      alert('missing subscription length')
    } else  {
      let {newEmail} = e.target;
      axios.post(`${process.env.BACKEND_URL}/new_email`, {
        email: newEmail.value,
        subscription_length: subscription
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        setEmail(newEmail.value);
        setComplete(true)
        
      }).catch((error) => {
        console.log(error);
        //  router.replace('/')
      });
    }



  }
  const handleLogin = async (ctx) => {
   const {Bearer} = await parseCookies(ctx);
    axios.get(`${process.env.BACKEND_URL}/logged_in`, {
         withCredentials: true,
         headers: {
           'Content-Type': 'none',
           "Authorization": Bearer
         }
       })
       .then(res => {
         if (res.data.is) {
           
           setAdmin(res.data.is)
         } else {
           
           router.replace('/')
         }
       }).catch((error) => {
         console.log(error);
         router.replace('/')


       });

   }
    const handleSelect = (e) => {
      console.log(e.target.value)
      if (e.target.value === 'false') {
        setSubscription(false)
      } else {
        setSubscription(e.target.value)
        
      }
    }
  const refresh = () => {
    router.reload()
  }
  useEffect(() => {
     handleLogin()
   }, [])
 if(complete) {
        return(
          <div className={styles.container}>
          <h2  className={styles.completeTitle}>Complete</h2>
          <h4 className={styles.completeTitle}>email sent, {email} was added to.</h4>
          <Link  href="/">
              <button className={styles.homeBtn}>Home</button>
          </Link>
              <button className={styles.anotherBtn} onClick={refresh}>Add Another User</button>
          </div>
        )
      }

  return(<div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>Add New User</h2> 
          <form onSubmit={handlePost}>
            <h2 className={styles.completeTitle}>invite new user to join website by email.</h2>
            <input name="newEmail" type="email" className={styles.input} placeholder="New User's Email" required/>
             <select onChange={handleSelect} className={styles.subscriptionSelect} required>
              <option value={false}>Select One</option>
              <option value='3'>3 months</option>
              <option value='6'>6 months</option>
              <option value='annual'>annual</option>
             </select> 
            <button type="submit" className={styles.createBtn}>Create</button>
          </form>
          </div>)


}