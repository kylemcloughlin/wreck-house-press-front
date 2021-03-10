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
  <li>About</li>
  <li>FAQ</li>
  <li>Contact Us</li>
</ul >
 <ul className={navStyles.itemB}>
    <h5>Advertising</h5>
  <li>Services</li>
  <li> Place an Ad</li>
  <li>Advertising</li>
</ul>
<ul className={navStyles.itemC}>
    <h5>links</h5>  
  <li>Amazon</li>
  <li>Facebook</li>
  <li>Twitter</li>
</ul>
  </div>
    </footer>

  
  )
}

export default Footer