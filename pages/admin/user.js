import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import AddUser from '../../components/AddUser.js';
import UpdateUser from '../../components/UpdateUser.js';


export default function User(ctx) {
  let [complete, setComplete] = useState(false)  
  let [admin, setAdmin] = useState(false)
  let [email, setEmail] = useState("")
  let [subscription, setSubscription] = useState(false)

  const router = useRouter();
  
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
   
  useEffect(() => {
     handleLogin()
   }, [])

  return(
    <div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>User Options</h2>
      <div  className={styles.title}>
        <button>Add User</button>
        <button>Update User</button>
      </div>
    
    </div>
  )


}