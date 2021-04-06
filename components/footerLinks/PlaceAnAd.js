
import {React, useState, useEffect} from 'react';
import styles from '../../styles/About.module.css';
import axios from  'axios'
import { useSpring, animated } from 'react-spring';
import loaderStyles from '../../styles/Loader.module.css';

const  PlaceAnAd = () => {
 const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false);

 const props = useSpring({
    height: sent ? 250 : 0,
    width: sent ? 500 : 0,
    transform: 'translate3d(0,0,0)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    opacity: '.6',
    // transition: mes ? '' :'2ss ease',

    config: {
      duration: 400
    },

  })
  



 const sendMail = event => {
   setPending(true)
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
    // console.log('hit')
    let {email, emailBody} = event.target;
    console.table(email.value, emailBody.value)
    axios.post(`${process.env.BACKEND_URL}/about`, {
          type: 'ad',
          email: email.value,
          email_body: emailBody.value
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
   .then((response) => {
    setSent(true)
    console.log(response)
    console.log(response.data);
        if(response.data.status === 200) {
        }
  }).catch((error) => {
    console.log(error);
    alert('something went wrong, please try again!')
  });

  }

    useEffect((ctx) => {

      
      },[sent]);
      if(sent) {
        return (
           <animated.div style={props} className={styles.sent}>
              <p className={styles.message}>message was sent!</p>
             </animated.div> 
        )
      }

    return (
        <div className={styles.contactContainer}>
    <form onSubmit={sendMail} className={styles.contact}>
      <span className={styles.label}>EMAIL ADDRESS</span>
      <input className={styles.email} name="email" type="email" autoComplete="email" placeholder="Your Email Address" className={styles.email} required />
      {/* <input id="subject" type="text" placeholder="Subject" className={styles.subject} required /> */}
      <span className={styles.label}>EMAIL BODY</span>      
      <textarea className={styles.emailBody} name="emailBody"  placeholder="Email Body " required />
      {pending ? (<div className={loaderStyles.ldsRing} style={{bottom: '0em', left: '45%'}}><div></div><div></div><div></div><div></div></div>): ( <button  type="submit" className={styles.emailButton}>SEND</button>)}
    </form>
  </div>
  )
}

export default PlaceAnAd