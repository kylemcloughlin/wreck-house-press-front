import {React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
const Footer = () => {
const links = [{
  name: "about",
  subLinks: ["About", "FAQ", "Contact Us"]
}, {
  name: "advertising",
  subLinks: ["Advertising", "Services", "Place An Ad"]
}, {
  name: "publishing",
  subLinks: ["Services", "Contact for Authors"]
}]
const styles = [navStyles.itemA, navStyles.itemB, navStyles.itemC]
  return(
    <footer className={navStyles.footer}>
<div className={navStyles.footerListHolder}>
   <div className={navStyles.footerList}>
   {links.map((link, ind) =>{
      return(
        <ul className={styles[ind]} key={ind}>
        
        <h3>{link.name}</h3>
        {link.subLinks.map(subLink =>{
          return( <Link href={`/${link.name}/[${link.name}]`} key={subLink}  as={`/${link.name}/${subLink}`}>
                    <li>{subLink}</li>
                   </Link>  ) })}
        </ul>)
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
  