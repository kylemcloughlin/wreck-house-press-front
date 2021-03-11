import {React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
const Footer = () => {
  return(
    <footer className={navStyles.footer}>
  <div className={navStyles.footerList}>
   <ul className={navStyles.itemA}>
    <h5>Wreck House Weekly</h5>
 <Link href="/about">
  <li>About</li>
 </Link>
 <Link href="/about">
  <li>FAQ</li>
 </Link>  
 <Link href="/about">
  <li>Contact Us</li>
 </Link>
</ul >
 <ul className={navStyles.itemB}>
    <h5>Advertising</h5>
 <Link href="/advertising">
  <li>Services</li>
 </Link>
 <Link href="/advertising">
  <li> Place an Ad</li>
 </Link>
 <Link href="/advertising">
  <li>Advertising</li>
 </Link>
</ul>
<ul className={navStyles.itemC}>
    <h5>links</h5>  
  <li><a href="https://www.amazon.com/Rosalyn-Roy/e/B016V5TB34">Amazon</a></li>
  <li><a href="https://www.facebook.com/WreckhousePress">Facebook</a></li>
  <li><a href="https://twitter.com/tygerlylly">Twitter</a></li>
</ul>
  </div>
    </footer>

  
  )
}

export default Footer