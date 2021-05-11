import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';

const UpdateUser = (ctx) => {
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
  
//  if(complete) {
//         return(
//           <div className={styles.container}>
//           <h2  className={styles.completeTitle}>Complete</h2>
//           <h4 className={styles.completeTitle}>User has been updated, new information:</h4>
//           <h4 className={styles.completeTitle}>New Information Here</h4>
          
//           <Link  href="/">
//               <button className={styles.homeBtn}>Home</button>
//           </Link>
//               <button className={styles.anotherBtn} onClick={refresh}>BROKEN BUTTON</button>
//           </div>
//         )
//       }

  return(<div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>Update User's information</h2> 
          <form onSubmit={handlePost}>
            <button type="submit" className={styles.createBtn}>Update</button>
          </form>
          </div>)
}
export default UpdateUser