import {React, useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '../styles/Index.module.css'
const AddStory = ({newStories, header}) => {
console.log("header", header)

 const countDown = (x) => {
  let today = new Date();
  const oneDay = 24 * 60 * 60 * 1000; 
  let secondDate = new Date(x);
  const diffDays = Math.round(Math.abs((today - secondDate) / oneDay));
  return `posted ${diffDays} day's ago`;
}
  return (<div className={styles.addStoryContainer}>
          < div className={styles.line}/>
            {newStories.map((x, ind) =>{
              let tet = ind < 2 ? (styles.story) : (styles.storyLast)
              // console.log(tet);
              return(
                <Link key={x.id} href="article/[article]" as={`/article/${x.id}`}> 
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