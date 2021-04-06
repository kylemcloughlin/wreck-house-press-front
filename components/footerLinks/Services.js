
import {React, useState, useEffect} from 'react';
import styles from '../../styles/About.module.css';
const  Services= () => {
// console.log(category)


  return (
    <div className={styles.advertContainer}>
          <div className={styles.topHolder}>
      <section className={styles.itemE}>
        <h1 className={styles.color}>Advertising Services</h1>
        <h2>Would you like to advertise in our weekly print edition? Simply get in touch to find out more.</h2>
        <h2 className={styles.color}>Other services:</h2>
        <h3><i>If you can put it on paper, chances are we can print it!</i></h3>
      </section>
      <section className={styles.itemD}>
        <p className={styles.para}>Our print advertising is designed to be affordable for all types of businesses, from home-based offices to small enterprises and larger corporations. We will work with you to design a package that meets your needs and price point while still getting your message out to all residents along the Southwest Coast of Newfoundland, from South Branch to Rose Blanche - Harbour Le Cou.</p>
        <p className={styles.line}>Graphic design and editing services.</p>
        <p className={styles.line}>Contact us for a free custom quote.</p>
      </section>
      </div>
      <div className={styles.bottomHolder}>
      <section className={styles.itemF}>
        <div className={styles.contactHolder}>
          <h2>CONTACT INFO:</h2>
          <p>Office: (709) 695-2389</p>
          <p>Email: info@wreckhousepress.com</p>
        </div>
        <div className={styles.contactHolder}>
        <h2>MAILING ADDRESS:</h2>
          <p>PO Box 773, Port aux Basques, NL  A0M 1C0</p>
        </div>
      </section>
      </div>
  </div>
  )
}


export default Services