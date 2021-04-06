import {React, useState, useEffect} from 'react';
import styles from '../../styles/Settings.module.css';
import { useSpring, animated } from 'react-spring';



const UpdateEmail = ({handleEmail, message}) => {
  const [toggle, setToggle] = useState(false);
  const [mess, setMess] = useState('');
  const [error, setError] = useState(false)
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
    function handleError() {
    setTimeout(function () { setError(false), setMess('')}, 2000);
  }    
  useEffect(() => {
      setMess(message)
  if (message) {
    setError(true)
        handleError()

  }


      
  },[message]);

  return ( 
      <li>
       <button className={styles.btn} onClick={handleToggle}>Update Email</button>
       <div className={styles.underline}/>
       <animated.div style={props} className={styles.formHolder}>
         <form onSubmit={handleEmail}>
       {mess ? (<div className={styles.err}>{message}</div>) : (<div/>)}
           <input className={styles.input} name="email" type="email" placeholder="Email" required  />
           <input className={styles.input} name="emailConfirm" type="email" placeholder="Email confirm" required />
  
             <button type="submit" className={styles.confirm}>confirm</button>
           
           </form>
          </animated.div>
      </li>
         )
}

export default UpdateEmail