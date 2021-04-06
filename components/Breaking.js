import {React, useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../styles/Breaking.module.css';
import { useAppContext } from '../context/AppContext';

const Breaking = ({breaking}) => {
let x = breaking[0]
console.log(x);
let globalState = useAppContext().catagories;
let subs = useAppContext().subcatagories;
  
     return(<div className={styles.container}>
           <h4 className={styles.breaking} >BREAKING</h4>
            <div className={styles.underline}/>
             <Link key={x.id} href="article/[article]" as={`/article/${x.url}`}> 
            <div className={styles.addStory}>
               <img className={styles.breakingImg} src={x.fallback[0]} /> 
               <h5 className={styles.breakingCatTitle}>{globalState[x.categorization_id]}</h5>
               {x.subcategorization_id ? ( <h5 className={styles.breakingSubCatTitle}>{subs[x.subcategorization_id - 1]}</h5>) : (<div/>)}
               <h2 className={styles.breakingHeader}>{x.title}</h2>
               <h6 className={styles.breakingFooter}>{x.originalPost}</h6>
             </div>
            </Link>
            </div>)
 
}


export default Breaking