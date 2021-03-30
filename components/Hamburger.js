import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styles from '../styles/Hamburger.module.css';  
import { useAppContext } from '../context/AppContext'; 
import Link from 'next/link';
import { useState } from 'react';

const Hamburger = () => {
    let globalState = useAppContext().hamburger;
    let [open,setOpen] = useState(false);
  let handleClick = () => {
    setOpen(!open);
  } 
  return (
    <Menu isOpen={open}>
      <ul>
     { globalState.map((x, ind)=> {
      //  let clickedNavButtonStyle =  clicked === ind ? ({ color: '#59BCC0'}) : ({color: '#B9B7B7' })
       let url = ind === 0 ? ("") : (ind.toString())
       let link = ind === 0 ? ("/") : ("/[category]")
       let classCondit = x.subs === null ? (styles.btn) : (styles.btnWithSubs)
       return (<li key={100 + ind}>
       
        <Link href={link} as={`/${url}`}>
        <button className={classCondit} value={ind} onClick={handleClick}>{x.cat}</button>
        </Link> 
          {x.subs === null? (<div/>) : (x.subs.map((sub, idx) => {
            return(
              <Link key={2000 + sub.id} href="/subcategory/[subcategory]" as={`/subcategory/${sub.id}`}>
            <button className={styles.btn} onClick={handleClick}>{sub.name}</button>
             </Link> 
            ) 
          }))}  
        </li>)
      })}
      </ul>
    </Menu>
  );
}
export default Hamburger

