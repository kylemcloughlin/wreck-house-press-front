import {React, useState, useEffect} from 'react';
import styles from '../../styles/Settings.module.css';
import { useSpring, animated } from 'react-spring';



const UpdatePassword= ({handlePassword}) => {
  const [toggle, setToggle] = useState(false);

  const props = useSpring({
    height: toggle ? 170 : 0,
    marginBottom: toggle ? 15 : 0,
    transform: 'translate3d(0,0,0)',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    config: {
      duration: 400
    },
    visibility: toggle ? "visible" : 'hidden',
  })
  const handleToggle = (e) => {

    setToggle(!toggle)
  }
  
  return ( 
      <li> 
      <button className={styles.btn} onClick={handleToggle}>Update Password</button>
       <div className={styles.underline}/>           
    <animated.div style={props} className={styles.formHolder}>
        <form onSubmit={handlePassword}>
           <input  className={styles.input} name="newPassword" type="password" placeholder="New Password" required />
           <input  className={styles.input} name="newPasswordConfirm" type="password" placeholder="New Password Confirm" required />
             <button type="submit" className={styles.confirm}>confirm</button> 
           </form>
          </animated.div>
      </li>
                 
         )
}

export default UpdatePassword