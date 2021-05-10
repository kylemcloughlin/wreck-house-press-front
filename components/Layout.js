import {React, useState, useEffect} from 'react';
import Nav from './Nav'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
const Layout = ({children, category, loggedIn, expiry}) => {


  return (
    <>
    <Nav category={category} loggedIn={loggedIn} expiry={expiry}/>
    
      <main className={styles.main}>
    
        {children}
    
      </main>
    
    <Footer loggedIn={loggedIn}/>
    </>
  )
}


export default Layout