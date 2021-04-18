import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';

export default function addUser(ctx) {
  let [complete, setComplete] = useState(false)  
  let [admin, setAdmin] = useState(false)
  let [PDF, setPDF] = useState()
  const router = useRouter();
  const handlePost = (e) => {
    e.preventDefault();
    let { paper } = e.target;
    console.log(paper.value)
    axios.post(`${process.env.BACKEND_URL}/editions`, {
      pdf: paper.value
    }, {
         withCredentials: true,
          headers: {
           'Content-Type': 'application/json'
         }
       })
       .then(res => {
        console.log(res)
            setComplete(true)
            setPDF(res.data.edition.pdf)
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
   }, [])
 if(complete) {
        return(
          <div className={styles.container}>
          <h2  className={styles.completeTitle}>Complete</h2>
          <h4 className={styles.completeTitle}>This Weeks News Paper was added.</h4>
          <Link  href="/">
              <button className={styles.homeBtn}>Home</button>
          </Link>
          </div>
        )
      }

  return(<div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>Add This Weeks News Paper</h2> 
          <form onSubmit={handlePost}>
          <h3 className={styles.completeTitle}>Add This Weeks Paper</h3>
          <input name="paper" type="text"   placeholder="This Weeks News Paper" className={styles.input}  required/>
        <button type="submit" className={styles.createBtn}>Submit</button>

          </form>
        </div>)

}