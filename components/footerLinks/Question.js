import {React, useState, useEffect} from 'react';
import styles from '../../styles/FooterLinks.module.css';
import { useSpring, animated } from 'react-spring';

const Quesion = ({data}) => {
 const [toggle, setToggle] = useState(false);

 const props = useSpring({
   height: toggle ? 150 : 0,
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
 return( <div>
            <button onClick={handleToggle} className={styles.btn}>{data.question}</button>
            <div className={styles.underline}/>
               <animated.div style={props}>

            {data.answers.map(x => {
              return( 
                <p className={styles.faqPara}>{x}</p>
                )
              })}

           </animated.div>
              </div>)

}

export default Quesion