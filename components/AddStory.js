import {React, useState, useEffect} from 'react';

import styles from '../styles/Index.module.css'
const AddStory = ({newStories}) => {
console.log(newStories)

  return (<div className={styles.addStoryContainer}>
            {newStories.map((x, ind) =>{
              return(<div key={ind}>
                 <h2 className={styles.artTitle}>{x.title}</h2>
                <h6 className={styles.date}>{x.originalPost}</h6>
              </div>

              )
            })}
           </div>)
}


export default AddStory