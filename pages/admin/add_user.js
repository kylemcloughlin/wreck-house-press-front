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
  const router = useRouter();
  const handlePost = (e) => {
    e.preventDefault();
    let {newEmail} = e.target;
    axios.post(`${process.env.BACKEND_URL}/new_email`, {
      email: newEmail.value
    }, {
         withCredentials: true,
          headers: {
           'Content-Type': 'application/json'
         }
       })
       .then(res => {
            setEmail(newEmail.value);
            setComplete(true)
        console.log(res);
       }).catch((error) => {
         console.log(error);
        //  router.replace('/')


       });



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
           console.log('hithithti', res.data.is)
           setAdmin(res.data.is)
         } else {
           console.log('elselseelse')
           router.replace('/')
         }
       }).catch((error) => {
         console.log(error);
         router.replace('/')


       });

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
          <h2 className={styles.completeTitle}>Add Email of New User</h2>
          <input name="newEmail" type="email" className={styles.input} placeholder="New User's Email" required/>
        <button type="submit" className={styles.createBtn}>Create</button>

          </form>
          </div>)

}