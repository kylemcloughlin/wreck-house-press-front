import {React, useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../styles/Breaking.module.css';
import { useAppContext } from '../context/AppContext';


const Breaking = ({breaking}) => {

let x = breaking[0]
let globalState = useAppContext().catagories;
let subs = useAppContext().subcatagories;
    const countDown = (x) => {
      let test = new Date(breaking[0].created_at);
    let date2 = new Date(); // 9:00 AM
    let date1 = new Date(x);
    let diff = date2 - test;
    let msec = diff;
    let ss = Math.floor(msec / 1000);
    let mm = Math.floor(msec / 1000 / 60);
    let hh = Math.floor(msec / 1000 / 60 / 60);
    let days = Math.floor(hh / 24)
    let years = Math.floor(days / 365)
      console.log(x, test)
    
      if (years > 0) {
        return `posted ${years} years ago`;
      } else if (days > 0) {
        return `posted ${days} days ago`;

      } else if ( hh > 0) {
        return `posted ${hh} hours ago`;

      } else if (mm > 0) {
        return `posted ${mm} minutes ago`;
      } else  {
        return `posted ${ss} seconds ago`;

      }
      
     }
     return(<div className={styles.breakingContainer}>
           <h4 className={styles.breaking} >BREAKING</h4>
            <div className={styles.underline}/>
             <Link key={x.id} href="article/[article]" as={`/article/${x.url}`}> 
            <div className={styles.addStory}>
               <img className={styles.breakingImg} src={x.fallback[0]} /> 
               <h5 className={styles.breakingCatTitle}>{globalState[x.categorization_id]}</h5>
               {x.subcategorization_id ? ( <h5 className={styles.breakingSubCatTitle}>{subs[x.subcategorization_id - 1]}</h5>) : (<div/>)}
               <h2 className={styles.breakingHeader}>{x.title}</h2>
               <h6 className={styles.breakingFooter}>{countDown(x.originalPost)}</h6>
             </div>
            </Link>
            </div>)
 
}


export default Breaking