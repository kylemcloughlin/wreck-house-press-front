import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import AddUser from '../../components/AddUser.js';
import UpdateUser from '../../components/UpdateUser.js';


export default function User(ctx) {
  let [selected, setSelected] = useState(false)  
  let [admin, setAdmin] = useState(false)
  let [elemnt, setElemnt] = useState()

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
   const handleClick = (e) => {
     if (e.target.value === 'add') {
       setSelected(e.target.value)
        console.log(e.target.value)

     } else {
      //  elemnt = UpdateUser
       setSelected(e.target.value)
       console.log(e.target.value)

     }
   }
   useEffect(() => {
     handleLogin()
    }, [])

if (selected) {

  return(
    <div>
      {selected === 'add' ? (<AddUser/>) : (<UpdateUser/>)}
    </div>
  )
  
}
  return(
    <div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>User Options</h2>
      <div  className={styles.title}>
        <button className={styles.button} onClick={handleClick} value='add'>Add User</button>
        {/* <button className={styles.button} onClick={handleClick} value='update'>Update User</button> */}
      </div>
    
    </div>
  )


}