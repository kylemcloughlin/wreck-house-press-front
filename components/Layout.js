import {React, useState} from 'react';
import Nav from './Nav'
import styles from '../styles/Layout.module.css'
const Layout = ({children, category}) => {
  let [test, setTest] = useState({test: true});

  
  return (
    <>
    <Nav category={category}/>
    <div className={styles.container}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
    </>
  )
}


export default Layout