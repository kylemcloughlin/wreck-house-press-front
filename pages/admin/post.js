import { parseCookies } from 'nookies';
import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Breaking.module.css';
import { useAppContext } from '../../context/AppContext'; 
import Datetime from 'react-datetime';
import moment from 'moment-timezone';
import axios from 'axios';
import Link from 'next/link';

export default function Post() {
  let cats = useAppContext().hamburger
  let [subs, setSubs] = useState(null)
  let [publishTime, setPublishTime] = useState()
  let [posted, setPosted] = useState(false)
  let [admin, setAdmin] = useState(false)
  let [range, setRange] = useState(6)
   const router = useRouter();

  
      
    const handleSelect = (e) => {
      e.preventDefault();
      let x = e.target.value
      let category = cats[Number(x)]
      
      setSubs(category.subs)
    }

    const handleRange = (e) => {
      e.preventDefault();
      let x = e.target.value
      
      setRange(x)
    }
    const handleTime = (e) => {
  
      let dateTime = e._d;
      
      // setPublishTime(dateTime)

      // add this to check if it is time to post this.
      const mo1 = moment(dateTime).format() 

      let vx = moment(mo1).tz('America/Toronto').format()
        setPublishTime(vx)
      // const mo2 = moment(dateTime).tz("America/st_johns");
      
    }
      const refresh = () => {
      router.reload()
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
           
           setAdmin(res.data.is)
         } else {
           
           router.replace('/')
         }
       }).catch((error) => {
         console.log(error);
         router.replace('/')


       });

   }

    const handlePost = (e) => {
      e.preventDefault()
      let {title, author, readTime, category, subcategory, photos, subtitles, body, url} = e.target;
      let splitBody = body.value.split("\n")
      let output = {
        article: {
          title: title.value,
          author: author.value,
          url: url.value,
          rt: readTime.value,
          category: category.value,
          breaking: false,
          subcategory: subcategory.value,
          photos: [photos.value],
          subtitles: subtitles.value,
          body: splitBody,
          publishTime: publishTime
          
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
        if (response.status === 201) {
          setPosted(true)
        } else {
          
        }
      }).catch((error) => {
        console.log(error);
      })
    }
      useEffect(() => {
          handleLogin()
      }, [subs, posted])
      
      
      
    
  

      if (posted) {
        return(
            <div className={styles.container}>
            <h1 className={styles.completeTitle}>posted</h1>
            <Link  href="/">
              <button className={styles.homeBtn} >Home</button>
            </Link>
          <button className={styles.anotherBtn} onClick={refresh}>Update Another</button>
            </div>
        )
      }


  return (
     <div className={styles.postContainer}>
      <h2  className={styles.completeTitle}>Create Article</h2> 
          <form onSubmit={handlePost}>
          <ul className={styles.list}>
        <li>
          <label>Title</label>
          <input name="title" type="text"   placeholder="Title" required />
        </li>   
        <li>
          <label>Url</label>
          <input name="url" type="text"  placeholder="Title minus special characters(;,!?)" required />
        </li>    
         <li className={styles.holder}>
          <label>Author</label>
          <input name="author" type="select"   placeholder="Authors"  className={styles.split} required />
          <label>Read Time: {range}</label>         
          <input name="readTime" type="range"  value={range} placeholder="Read Time"  max='60' onChange={handleRange} className={styles.split} required />
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
          <label>Publish Time</label>
          <Datetime onChange={handleTime}/>
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
      </div> )
}