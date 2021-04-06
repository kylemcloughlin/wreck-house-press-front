import styles from '../../styles/About.module.css';
import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FooterAbout from "../../components/footerLinks/FooterAbout.js";
import FAQ from "../../components/footerLinks/FAQ.js";
import ContactUs from "../../components/footerLinks/ContactUs.js";


export default function About() {
   const router = useRouter();
  const [title, setTitle] =useState()
  const [elmnt, setElmnt] = useState()
  useEffect (() => {
    let holder = router.asPath.split("/")
    let value = holder[2];
    let test = value.split("%20")
    let output = test.join(" ")

    switch (output) {
      case "FAQ":
      setElmnt(<FAQ/>)
        break;
      case "About":
      setElmnt(<FooterAbout/>)
        break;
      default:
      setElmnt(<ContactUs/>)
        
    }
    setTitle(output)
  },[router]) 
  return (   
  
  <div className={styles.mainContainer}>
  <div className={styles.holder}>

    <h1 className={styles.title}>{title}</h1>

      {elmnt}
  </div>
  </div>)
}