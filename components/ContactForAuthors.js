
import {React, useState, useEffect} from 'react';
import styles from '../styles/FooterLinks.module.css';
const ContactForAuthors = () => {
  const sendMail = event => {
    event.preventDefault();
    console.log('hit')



  }

  return (
    <form onSubmit={sendMail}>
    <input id="email" type="email" autoComplete="email" placeholder="email" className={styles.email} required />
      <input id="subject" type="text" placeholder="Subject" className={styles.subject} required />
      <input id="name" type="text" required  className={styles.textArea}/>
      <button type="submit" className={styles.contactBtn}>Register</button>
    </form>
  )
}


export default ContactForAuthors