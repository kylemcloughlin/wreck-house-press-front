import {React, useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../styles/Index.module.css'
const AddStory = ({newStories, header}) => {
 const countDown = (x) => {
    let date2 = new Date(); // 9:00 AM
    let date1 = new Date(x);
    let diff = date2 - date1;
    let msec = diff;
    let ss = Math.floor(msec / 1000);
    let mm = Math.floor(msec / 1000 / 60);
    let hh = Math.floor(msec / 1000 / 60 / 60);
    let days = Math.floor(hh / 24)
    let years = Math.floor(days / 365)
    // let year  = 
    // console.log(`years: ${years} days: ${days} hh: ${hh / 24} mm: ${mm} `)
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
  return (<div className={styles.addStoryContainer}>
          < div className={styles.line}/>
            {newStories.map((x, ind) =>{
              let tet = ind < 2 ? (styles.story) : (styles.storyLast)
              // console.log(tet);
              return(
                <Link key={x.id} href="article/[article]" as={`/article/${x.url}`}> 
              <div key={ind} className={tet}>
              <h5 className={styles.addedHeader}>{header}</h5>
                 <h2 className={styles.addedTitle}>{x.title}</h2>
                <h6 className={styles.addedDate}>{countDown(x.originalPost)}</h6>
              </div>
              </Link>
              )
            })}
           </div>)
}


export default AddStory