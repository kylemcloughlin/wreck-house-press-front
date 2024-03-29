import styles from '../../styles/About.module.css';
import {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FooterAdvertising from "../../components/footerLinks/FooterAdvertising.js";
import PlaceAnAd from "../../components/footerLinks/PlaceAnAd.js"
import Services from "../../components/footerLinks/Services.js";

export default function Advertising({params}) {
  const router = useRouter();
    const [elmnt, setElmnt] = useState()
  const [title, setTitle] =useState()
  useEffect (() => {

    let holder = router.asPath.split("/")
    let value = holder[2];
    let test = value.split("%20")
    let output = test.join(" ")

    switch (output) {
      case "Advertising":
      setElmnt(<FooterAdvertising/>)
        break;
      case "Place An Ad":
      setElmnt(<PlaceAnAd/>)
        break;
      default:
      setElmnt(<Services/>)
        
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