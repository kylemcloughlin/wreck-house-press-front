import {React, useState, useEffect} from 'react';

import styles from '../styles/Index.module.css'
const AddStory = ({newStories, header}) => {
console.log("header", header)

  return (<div className={styles.addStoryContainer}>
          < div className={styles.line}/>
            {newStories.map((x, ind) =>{
              let tet = ind < 2 ? (styles.story) : (styles.storyLast)
              // console.log(tet);
              return(<div key={ind} className={tet}>
              <h5 className={styles.addedHeader}>{header}</h5>
                 <h2 className={styles.addedTitle}>{x.title}</h2>
                <h6 className={styles.addedDate}>{x.originalPost}</h6>
              </div>

              )
            })}
           </div>)
}


export default AddStory