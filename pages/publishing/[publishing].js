import styles from '../../styles/About.module.css';
import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PublishingServices from "../../components/footerLinks/PublishingServices.js";
import ContactForAuthors from "../../components/footerLinks/ContactForAuthors.js";
export default function Publishing() {
  const router = useRouter();
  const [elmnt, setElmnt] = useState();
  const [title, setTitle] = useState();
  useEffect (() => {

    let holder = router.asPath.split("/")
    let value = holder[2];
    let test = value.split("%20")
    let output = test.join(" ")

     switch (output) {
      case "Services":
      setElmnt(<PublishingServices/>)
      break;
      default:
      setElmnt(<ContactForAuthors/>)
        
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