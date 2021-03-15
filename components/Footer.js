import {React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
const Footer = () => {
  return(
    <footer className={navStyles.footer}>
<div className={navStyles.footerListHolder}>
   <div className={navStyles.footerList}>
   <ul className={navStyles.itemA}>
    <h3>Wreck House Weekly</h3>
 <Link href="/about">
  <li>About</li>
 </Link>
 <Link href="/about">
  <li>FAQ</li>
 </Link>  
 <Link href="/about">
  <li>Contact Us</li>
 </Link>
  {/* <li><a href="https://www.amazon.com/Rosalyn-Roy/e/B016V5TB34">Amazon</a>
<a href="https://www.facebook.com/WreckhousePress">Facebook</a>
<a href="https://twitter.com/tygerlylly">Twitter</a>
</li> */}
</ul >
 <ul className={navStyles.itemB}>
    <h3>Advertising</h3>
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
    <h3>Publishing</h3>
 <Link href="/advertising">
  <li>Services</li>
 </Link>
 <Link href="/advertising">
  <li>Contact for Authors</li>
 </Link>
</ul>
  </div>
  </div>
    </footer>

  
  )
}

export default Footer