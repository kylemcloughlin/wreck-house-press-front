import {React, useState, useEffect } from 'react';
import MobileFooter from './MobileFooter';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
const Footer = ({loggedIn}) => {
  let [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const links = [{
  name: "about",
  subLinks: ["About", "FAQ", "Contact Us"]
}, {
  name: "advertising",
  subLinks: [ "Services", "Place An Ad"]
}, {
  name: "publishing",
  subLinks: ["Contact for Authors"]
}]

  const linksWithUser = [{
    name: "about",
    subLinks: ["About", "FAQ", "Contact Us"]
  }, {
    name: "advertising",
    subLinks: ["Services", "Place An Ad"]
  }, {
    name: "publishing",
    subLinks: ["Contact for Authors"]
  }]
let conditional = loggedIn ? (linksWithUser) : (links)

const styles = [navStyles.itemA, navStyles.itemB, navStyles.itemC, navStyles.itemD]
  // console.log('footski',loggedIn)
 
useEffect((ctx) => {

    setIsLoggedIn(loggedIn)


       },[loggedIn])
  return(
    <footer className={navStyles.footer}>
<div className={navStyles.footerListHolder}>
   <div className={navStyles.footerList}>
   {linksWithUser.map((link, ind) =>{
      return(
        <ul className={styles[ind]} key={ind}>
        
        <h3>{link.name}</h3>
        {link.subLinks.map(subLink =>{

          return( <Link href={`/${link.name}/[${link.name}]`}   key={ind + 300} as={`/${link.name}/${subLink}`}>
                    <li key={ind + 300}>{subLink}</li>
                  </Link>  ) })}
        </ul>)
   })}
      <div className={navStyles.socialBar}>
              <div><a href="https://www.facebook.com/rene.j.roy"><img  src='/images/greyFb.png'/></a></div>
            <div><a href="https://twitter.com/hfxhabby"><img  src='/images/greyTwitt.png'/></a></div>
          <div> <a href="https://www.instagram.com/roy7512/"><img  src='/images/greyInsta.png'/></a></div>
    </div>
<span className={navStyles.copyright}>Wreckhouse Press © 2021 </span>
  </div>

  <div className={navStyles.mobileFooter}>
     {linksWithUser.map((link, ind) =>{
       return(<div> 
        <div key={ind + 400}>
          <MobileFooter children={link}/>
        </div>
             </div>)
         })}
  </div>
    
     
  
  </div>
    </footer>

  
  )
}

export default Footer


  
    /* <li><a href="https://www.amazon.com/Rosalyn-Roy/e/B016V5TB34">Amazon</a>
    <a href="https://www.facebook.com/WreckhousePress">Facebook</a>
    <a href="https://twitter.com/tygerlylly">Twitter</a>
    </li> */
  
                    
  //           {link.subLinks.map(subLink =>{
  // return( <Link href={`/${link.name}/[${link.name}]`} key={subLink}  as={`/${link.name}/${subLink}`}>
  //           <button>{subLink}</button>
  //          </Link>  ) })}