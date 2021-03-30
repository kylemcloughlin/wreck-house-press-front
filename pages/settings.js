import { parseCookies } from 'nookies';
import {React, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Breaking.module.css';
export default function Settings() {
    const router = useRouter();
  useEffect((ctx) => {
    const {Bearer} = parseCookies(ctx);
    if (!Bearer) {
      router.replace("/");
      console.log('hit')
    } 
      },[]);
  
  
  return (<div className={styles.container}>
            <h1>settings</h1>
            <ul>
              <li>
                <button>Update Email</button>
                <div className={styles.underline}/>
              </li>
               <li>
                <button>Update Password</button>
                <div className={styles.underline}/>
              </li> 
              <li>
                <button>Delete Account</button>
                <div className={styles.underline}/>
              </li>
               <li>
                <button>cancel subscription</button>
                <div className={styles.underline}/>
              </li>
            </ul>
          </div> )
}