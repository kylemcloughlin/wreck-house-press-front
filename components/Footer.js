import {React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
const Footer = () => {
  return(
    <footer className={navStyles.footer}>
  {/* <div className={navStyles.footerList}>
    <h5>Wreck House Weekly</h5>
   <ul>
  <li>About</li>
  <li>Advertising</li>
  <li>Contact Us</li>
</ul>
  </div> */}
 {/* <ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul> */}
    </footer>

  
  )
}

export default Footer