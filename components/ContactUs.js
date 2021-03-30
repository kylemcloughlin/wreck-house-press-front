
import {React, useState, useEffect} from 'react';
import styles from '../styles/About.module.css';
const ContactUs = () => {
  const sendMail = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    console.log('hit')





  }

  return (
        <div className={styles.contactContainer}>
    <form onSubmit={sendMail} className={styles.contact}>
      <span className={styles.label}>EMAIL ADDRESS</span>
      <input className={styles.email} id="email" type="email" autoComplete="email" placeholder="Your Email Address" className={styles.email} required />
      {/* <input id="subject" type="text" placeholder="Subject" className={styles.subject} required /> */}
<span className={styles.label}>EMAIL BODY</span>      
      <textarea className={styles.emailBody} id="email-body"  placeholder="Email Body " required />
      <button className={styles.emailButton} type="submit" className={styles.emailButton}>SEND</button>
    </form>
  </div>
  )
}


export default ContactUs