import {React, useState, useEffect} from 'react';
import Nav from './Nav'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'
const Layout = ({children, category}) => {

  return (
    <>
    <Nav category={category}/>
    
      <main className={styles.main}>
        {children}
      </main>
    
      <Footer/>
    </>
  )
}


export default Layout