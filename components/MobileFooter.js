import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
const MoblileFooter = ({children}) => {
  const [toggle, setToggle] = useState(false)
 const props = useSpring({
   height: toggle ? 70 : 0,
   config: {   duration: 400 },
   visibility: toggle ? "visible" : 'hidden',
 })

  const handleToggle = (e) => {
    
    setToggle(!toggle)
    props.height.interpolate(x => Math.floor((x.toFixed(0) * 100) / height))
  }
  return (
    <div>
        <button className={navStyles.mobileFooterName} onClick={handleToggle}>{children.name}</button>
      
      
        <animated.div className={navStyles.mobileFooterList} style={props}>

                     {children.subLinks.map(subLink =>{
           return( <Link href={`/${children.name}/[${children.name}]`} key={subLink}  as={`/${children.name}/${subLink}`}>
                     <button>{subLink}</button>
               </Link>  ) })}
       
        </animated.div>
      </div>

    ) 
  }
  
  
  export default MoblileFooter
  