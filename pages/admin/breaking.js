import { parseCookies } from 'nookies';
import {React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/Breaking.module.css';
import { useAppContext } from '../../context/AppContext'; 
import Link from 'next/link';
import { route } from 'next/dist/next-server/server/router';

export default function Breaking() {
  let cats = useAppContext().hamburger
  let [subs, setSubs] = useState(null)
  let [range, setRange] = useState(6)
  let [complete, setComplete] = useState(false)
  let [admin, setAdmin] = useState(false)
  const router = useRouter();
  console.log(cats)
 const refresh = () => {
   router.reload()
 }
  useEffect((ctx) => {
    // router.replace("/");
    // const {Bearer} = parseCookies(ctx);
    // if (!Bearer) {
      
    // } 
  },[]);
  
      const handleBreaking = (e) => {
        e.preventDefault()
        let {title, author, readTime, category, subcategory, photos, subtitles, body, url} = e.target;
        let splitBody = body.value.split("\n")
        
        let output = {
          article: {
            title: title.value,
            url: url.value,
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
          console.log(response.data)
          if (response.status === 'created') {
            setComplete(true);
          } else {
    
          }
        }).catch((error) => {
          console.log(error);
        })
      
      }
    const handleSelect = (e) => {
      e.preventDefault();
      let x =  e.target.value
      let category = cats[Number(x)]
      // console.log(category)
      // console.log(cat[category])
      setSubs(category.subs)
    }

     const handleRange = (e) => {
      e.preventDefault();
      let x =  e.target.value
        // console.log(x)
        setRange(x)
    }
    const handleLogin = async (ctx) => {
   const {Bearer} = await parseCookies(ctx);
    axios.get(`${process.env.BACKEND_URL}/logged_in`, {
         withCredentials: true,
         headers: {
           'Content-Type': 'none',
           "Authorization": Bearer
         }
       })
       .then(res => {
         if (res.data.is) {
           console.log('hithithti', res.data.is)
           setAdmin(res.data.is)
         } else {
           console.log('elselseelse')
           router.replace('/')
         }
       }).catch((error) => {
         console.log(error);
         router.replace('/')


       });

   }

    useEffect(() => {
      handleLogin();

    },[subs])
      

       if(complete) {
        return(
          <div className={styles.container}>
          <h2  className={styles.completeTitle}>Complete</h2>
          <Link  href="/">
              <button className={styles.homeBtn} >Home</button>
          </Link>
          </div>
        )
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
        <li>
          <label>Url</label>
          <input name="url" type="text"   placeholder="Title minus special characters(;,!?)" required />
        </li>     
         <li className={styles.holder}>
          <label>Author</label>
          <input name="author" type="select"   placeholder="Authors"  className={styles.split} required />
          <label>Read Time: {range}</label>         
          <input name="readTime" type="range"   placeholder="Read Time"  value={range} max='60' onChange={handleRange} className={styles.split} required />
        </li>
         <li className={styles.holder}>
          <select name="category"  className={styles.split} onChange={handleSelect} required>
         {cats.map((cat, id) =>{
           let x = cat.cat === 'Home'? ('Select One'): (cat.cat)
           let y = id === 0 ? ('') : (id)

           return(<option value={y} >{x}</option>)
         })}
         </select>      
          <select name="subcategory"  className={styles.split}>
          <option value="">Select One</option>
          { subs != null ? (subs.map((sub) =>{
                     return(<option value={sub.id}>{sub.name}</option>)
        
          })) :(<option value="">No Subcategories</option>)}
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