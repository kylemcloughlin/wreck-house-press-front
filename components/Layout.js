import {React, useState} from 'react';
import Nav from './Nav'
import styles from '../styles/Layout.module.css'
const Layout = ({children, category}) => {
  let [test, setTest] = useState({test: true});

  
  return (
    <>
    <Nav category={category}/>
    
      <main className={styles.main}>
        {children}
      </main>
    
      {/* <div className={styles.footer}></div> */}
    </>
  )
}


export default Layout