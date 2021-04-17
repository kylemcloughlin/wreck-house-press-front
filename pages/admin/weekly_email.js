import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';

export default function WeeklyEmail({emailList}) {
  let [complete, setComplete] = useState(false);
  let [eList, setEList] = useState(emailList)
  let [admin, setAdmin] = useState(false);
  const router = useRouter();
  console.log("email List", emailList)
  const handlePost = (e) => {
    e.preventDefault();
    console.log(e);
    setComplete(true)
  }
  const handleAddEmail = (e) => {
       e.preventDefault();
      let {newEmail } = e.target
    axios.post(`${process.env.BACKEND_URL}/email_lists`, {       
         email: newEmail.value
         }, {
           withCredentials: true,
           headers: {
             'Content-Type': 'application/json'
           }
         })
         .then(res => {
      
           console.log(res.data);
          setEList(res.data)
         }).catch((error) => {
           console.log(error);
      


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
        console.log(res.data.is)
        if (res.data.is) {
           console.log('hithithti', res.data.is)
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
   }, [eList])
 if(complete) {
        return(
          <div className={styles.container}>
          <h2  className={styles.completeTitle}>Email Scheduling: Complete</h2>
          <h4 className={styles.completeTitle}>This Weeks emailing list has been confirmed.</h4>
          <Link  href="/">
              <button className={styles.homeBtn}>Home</button>
          </Link>
          </div>
        )
      }

  return(<div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>Confirm EmaiList</h2> 
     
      <div  className={styles.completeEmailList}>{eList.map(email => {
        return(<div className={styles.emailListItem}>{email.email}</div>)
      })}</div> 

          <form onSubmit={handlePost}>
         <button type="submit" className={styles.confirmBtn}>Confirm EmaiList</button>
          </form>

          <form  onSubmit={handleAddEmail}>
            <h4  className={styles.completeTitle}>Add User to List</h4> 
            <input name="newEmail" type="email"  className={styles.input} placeholder="Add To Email List" />
            <button type="submit" className={styles.addBtn}>Add To List</button>
          </form>
        </div>)

}


export const getServerSideProps = async (ctx) => {
  

  const res = await fetch(`${process.env.BACKEND_URL}/email_lists`)
  const emailList = await res.json()


  return {
    props: {
      emailList
    }
  }


}