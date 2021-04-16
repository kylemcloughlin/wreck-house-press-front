import {React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Breaking.module.css';
import { useAppContext } from '../context/AppContext.js'; 
import axios from  'axios';
import Link from 'next/link';

const UpdateForm = ({suggestion}) => {
    let cats = useAppContext().hamburger
    let [subs, setSubs] = useState(null)
    let [range, setRange] = useState(6)
    let [complete, setComplete] = useState(false)
    let router = useRouter();
  
  const handleSelect = (e) => {
      e.preventDefault();
      let x = e.target.value
      let category = cats[Number(x)]
      setSubs(category.subs)
    }

    const handleRange = (e) => {
      e.preventDefault();
      let x = e.target.value
      // console.log(x)
      setRange(x)
    }
  
    
    const handlePost = (e) => {
      e.preventDefault()
      let {title, author, readTime, category, subcategory, photos, subtitles, body} = e.target;
      let splitBody = body.value.split("\n")
      let updatedArticle = {
       title: title.value,
       author: author.value,
       rt: readTime.value,
       categorization_id: category.value,
       subcategorization_id: subcategory.value,
       photos: [photos.value],
       subtitles: subtitles.value,
       body: splitBody
      }
         axios.put(`${process.env.BACKEND_URL}/articles/${suggestion.url}`, {
           updatedArticle
         }, {
           withCredentials: true,
           headers: {
             'Content-Type': 'application/json'
           }
         }).then(response => {
           if (response.status === 200) {
            console.log('hit')
            setComplete(true)
           }
         })
         .catch(err => {
           console.log(":(", err)
         });
      
      
    }
    const formatter = (array) => {
      let x =  []

      array.forEach((item, id) => {
        if (id == array.length -1) {
          console.log('hit')
          x.push(item)

        } else {
          x.push(item)
          x.push("\n")
          x.push("\n")

        }
        
     
      })
      return x.join("");
    } 

    const refresh = () => {
      router.reload()
    }
     useEffect((ctx) => {
      document.getElementById("title").value = suggestion.title;
      document.getElementById("author").value = suggestion.author;
      setRange(Number(suggestion.rt))
      document.getElementById("category").value = suggestion.categorization_id;
      let category = cats[Number(suggestion.categorization_id)]
      setSubs(category.subs)

      document.getElementById("subcat").value = Number(suggestion.subcategorization_id);
       

      setSubs(category.subs)
      document.getElementById("photos").value = suggestion.photos;
      document.getElementById("subtitles").value = suggestion.subtitles;
      document.getElementById("body").value = formatter(suggestion.body)      
      // suggestion.body;
      // setComplete(true)
    },[suggestion]);

      if(complete) {
        return(
          <div className={styles.container}>
          <h2  className={styles.completeTitle}>complete</h2>
          <Link  href="/">
              <button className={styles.homeBtn} >Home</button>
          </Link>
          <button className={styles.anotherBtn} onClick={refresh}>Update Another</button>
          </div>
        )
      }

   return (
     <div className={styles.container}>
    <h2  className={styles.completeTitle}>Update Article</h2> 
          <form onSubmit={handlePost}>
          <ul className={styles.list}>
        <li>
          <label>Title</label>
          <input name="title" type="text" id="title" placeholder="Title" required />
        </li>     
         <li className={styles.holder}>
          <label>Author</label>
          <input name="author" type="select" id="author" placeholder="Authors"  className={styles.split} required />
          <label>Read Time: {range}</label>         
          <input name="readTime" type="range" id="readTime"  value={range} placeholder="Read Time"  max='60' onChange={handleRange} className={styles.split} required />
        </li>
         <li className={styles.holder}>
          <select name="category"  className={styles.split} id="category" onChange={handleSelect} required>
         {cats.map((cat, id) =>{
           let x = cat.cat === 'Home'? ('Select One'): (cat.cat)
           let y = id === 0 ? ('') : (id)

           return(<option value={y} >{x}</option>)
         })}
         </select>      
          <select name="subcategory"  className={styles.split} id="subcat">
          <option value="">Select One</option>
          { subs != null ? (subs.map((sub) =>{
                     return(<option value={sub.id}>{sub.name}</option>)
        
          })) :(<option value="">No Subcategories</option>)}
          </select>                   
        </li>
         <li>
          <label>Photos</label>                    
          <input name="photos" type="text"  id="photos" placeholder="photos" required />
        </li>
        <li>
          <label>Subtitles</label>                    
          <input name="subtitles" type="text"  id="subtitles" placeholder="subtitles" required />
        </li>
        <li>
          <label>Body</label>                    
         <textarea name='body'  placeholder="Body" id="body" className={styles.textarea} required />
        </li>
      </ul>
      <div className={styles.buttonHolder}>
        <button type="submit">Create</button>
      </div>
    </form>
      </div> )
}
export default UpdateForm