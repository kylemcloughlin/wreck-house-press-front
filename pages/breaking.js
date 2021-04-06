import { parseCookies } from 'nookies';
import {React, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Breaking.module.css';
export default function Breaking() {
  const router = useRouter();
  useEffect((ctx) => {
    const {Bearer} = parseCookies(ctx);
    if (!Bearer) {
      // router.replace("/");
      console.log('hit')
    } 
      },[]);
  
      const handleBreaking = (e) => {
        e.preventDefault()
        let {title, author, readTime, category, subcategory, photos, subtitles, body} = e.target;
        let splitBody = body.value.split("\n")
        console.log(splitBody)
        let output = {
          article: {
            title: title.value,
            author: author.value,
            rt: readTime.value,
            category: category.value,
            breaking: true,
            subcategory: subcategory.value,
            photos: [photos.value],
            subtitles: subtitles.value,
            body: splitBody 

          }
        }
      axios.post(`${process.env.BACKEND_URL}/articles`, {
                article: output.article
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.data.status === 'created') {
                console.log('posted', response.data)
          } else {
            console.log('somthing went wrong?', response.data)
          }
        }).catch((error) => {
          console.log(error);
        })
      
      }


      
  return (
      <div className={styles.container}>
      <h3>Breaking Story</h3>
          <form onSubmit={handleBreaking}>
          <ul className={styles.list}>
        <li>
          <label>Title</label>
          <input name="title" type="text"   placeholder="Title" required />
        </li>     
         <li className={styles.holder}>
          <label>Author</label>
          <input name="author" type="select"   placeholder="Authors"  className={styles.split} required />
          <label>Read Time</label>         
          <input name="readTime" type="select"   placeholder="Read Time" className={styles.split} required />
        </li>
         <li className={styles.holder}>
  
          <select name="category"  className={styles.split} required>
           <option value="" >--Category--</option>
           <option value="1">Top Story</option>
           <option value="2">Local News</option>
           <option value="3">Sports</option>
           <option value="4">Opinion</option>
           <option value="5">Community</option>
           <option value="6">The Arts</option>
          </select>      
         
          <select name="subcategory"  className={styles.split} required>
           <option value="" >--Subcategory--</option>
           <option value="1">Columnists</option>
           <option value="2">Letters</option>
           <option value="3">Profile</option>
           <option value="4">On The Bookshelf</option>
           <option value="5">Music Row</option>
          </select>                   
        </li>
         <li>
          <label>Photos</label>                    
          <input name="photos" type="text"   placeholder="photos" required />
        </li>
        <li>
          <label>Subtitles</label>                    
          <input name="subtitles" type="text"   placeholder="subtitles" required />
        </li>
        <li>
          <label>Body</label>                    
         <textarea name='body'  placeholder="Email Body" className={styles.textarea} required />
        </li>
      </ul>
      <div className={styles.buttonHolder}>
        <button type="submit">Create</button>
      </div>
    </form>
      </div>
  )
}