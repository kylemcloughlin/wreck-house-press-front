import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';


const MoblileFooter = ({children}) => {
  const [toggle, setToggle] = useState(false);
 

  
 
  const props = useSpring({
   height: toggle ? 70 : 0,
   transform: 'translate3d(0,0,0)',
   display: 'flex',
   flexDirection: 'column',
   overflow: 'hidden',
   config: {   duration: 400 },
   visibility: toggle ? "visible" : 'hidden',
 })

  const handleToggle = (e) => {
    
    setToggle(!toggle)
    props.height.interpolate(x => Math.floor((x.toFixed(0) * 100) / height))
  }

  const reportWindowSize = () => {
          if (window.screen.width >= 701) {
            setToggle(false)
          } 

  }
  useEffect((ctx) => {
    window.addEventListener('resize', reportWindowSize);
    

  }, []);


  return (
    <div>
        <button className={navStyles.mobileFooterName} onClick={handleToggle}>{children.name}</button>
      
      
        <animated.div className={navStyles.mobileFooterList} style={props}>

                     {children.subLinks.map(subLink =>{
           return( <Link href={`/${children.name}/[${children.name}]`} key={subLink}  as={`/${children.name}/${subLink}`}>
                     <button className={navStyles.moblieFooterButton}>{subLink}</button>
               </Link>  ) })}
       
        </animated.div>
      </div>

    ) 
  }
  
  
  export default MoblileFooter
  