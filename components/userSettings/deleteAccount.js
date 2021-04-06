import {React, useState, useEffect} from 'react';
import styles from '../../styles/Settings.module.css';
import { useSpring, animated } from 'react-spring';



const DeleteAccount = ({handleDelete}) => {
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
      <button className={styles.btn} onClick={handleToggle}>Delete Account</button>
       <div className={styles.underline}/>           
       
       <animated.div style={props} className={styles.formHolder}>
        <form onSubmit={handleDelete}> 
             <input className={styles.input} name="email" type="email" placeholder="Email" required />
                  <input className={styles.input} name="password" type="password"  placeholder="Password" required />
             <button type="submit" className={styles.confirm}>confirm</button> 
           </form>
       </animated.div>
      </li>
                 
         )
}

export default DeleteAccount

