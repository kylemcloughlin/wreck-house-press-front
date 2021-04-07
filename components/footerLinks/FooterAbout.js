
import {React, useState, useEffect} from 'react';
import styles from '../../styles/About.module.css';
const FooterAbout= () => {


  return (
    <div className={styles.aboutContainer}>

    <main className={styles.aboutTopHolder}>
      <div className={styles.itemA}>
      <div className={styles.paraHolder}>
        <div className={styles.para}>At Wreckhouse Weekly, we believe that local stories and news matter now more than ever. Our goal is to share the stories of our communities and their residents so that they can be recognized and remembered.​ Our first print edition, Volume 1 - Issue 1, hit news stands on Aug. 10, 2020 and by the end of that month we also went digital. All of our newspapers are printed and delivered every Monday (barring holidays or extreme weather). Digital editions are updated every Monday at 8 A.M. Newfoundland time.</div>
        <div className={styles.para}>Wreckhouse Weekly is a community news publication of Wreckhouse Press, Inc. At our book publishing label, Wreckhouse Press Inc, we are focused on publishing and developing Newfoundland and Labrador authors, primarily fiction writers who delve into the province's rich culture and heritage.</div>
        <div className={styles.para}>To learn more about publishing with Wreckhouse Press, please visit our FAQ page or send us an e-mail. To see our list of published books, please visit our store page and be sure to check out our reader reviews!</div>
      </div>
      </div>
      <div className={styles.itemB}>
        <h1>Covering only local news and stories from the Southwest Coast of Newfoundland.</h1>
        <div className={styles.mailingAddress}>
        <div className={styles.addressHolder}>
          <h3>MAILING ADDRESS:</h3>
          <p>PO Box 773, Port aux Basques, NL  A0M 1C0</p>
          </div>
           <div className={styles.addressHolder}>
          <h3>CONTACT INFO:</h3>
          <p>Office: (709) 695-2389</p>
          <p>e-Mail: info@wreckhousepress.com</p>
        </div>
        </div>
      </div>
      </main>
      <div className={styles.aboutBottomHolder}>
        <div className={styles.itemC}>
        <h1 className={styles.staffTitle}>STAFF</h1>
        <div className={styles.staff}>
          <img className={styles.staffImg} src='/images/Rene_J_Roy_JPG.jpg'/>
          <h3>EDITOR-IN-CHIEF</h3>
          <p>René J. Roy</p>
          <p className={styles.staffEmail}>rjroy@wreckhousepress.com</p>
          <p>709-694-3375</p>
          <div className={styles.socialBar}>
            <div><a href="https://www.facebook.com/rene.j.roy"><img  src='/images/greyFb.png'/></a></div>
            <div><a href="https://twitter.com/hfxhabby"><img  src='/images/greyTwitt.png'/></a></div>
            <div> <a href="https://www.instagram.com/roy7512/"><img  src='/images/greyInsta.png'/></a></div>
         </div>
        </div>
        <div className={styles.staff}>
          <img  className={styles.staffImg} src="/images/Roz.jpg"/>
          <h3>STAFF REPORTER</h3>
          <p>Rosalyn Roy</p>
          <p  className={styles.staffEmail}>rroy@wreckhousepress.com</p>
          <p>709-695-0557</p>
            <div className={styles.socialBar}>
            <div><a href="https://www.facebook.com/rene.j.roy"><img  src='/images/greyFb.png'/></a></div>
            <div><a href="https://twitter.com/hfxhabby"><img  src='/images/greyTwitt.png'/></a></div>
            <div> <a href="https://www.instagram.com/roy7512/"><img  src='/images/greyInsta.png'/></a></div>
         </div>
        </div>
        </div>
      </div>
    </div>
  )
}


export default FooterAbout 