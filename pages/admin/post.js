import { parseCookies } from 'nookies';
import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Breaking.module.css';
import { useAppContext } from '../../context/AppContext'; 
import Datetime from 'react-datetime';
import moment from 'moment-timezone';
import axios from 'axios';
// import moment from 'moment';
// moment().format();

// import 'react-datepicker/dist/react-datepicker.css';
export default function Post() {
  let cats = useAppContext().hamburger
  let [subs, setSubs] = useState(null)
  let [publishTime, setPublishTime] = useState()
  let [posted, setPosted] = useState(false)

  let [range, setRange] = useState(6)
   const router = useRouter();
  useEffect((ctx) => {
    const {Bearer} = parseCookies(ctx);
    if (!Bearer) {
      // router.replace("/");
      
    } 
      },[]);
  
    const handleSelect = (e) => {
      e.preventDefault();
      let x = e.target.value
      let category = cats[Number(x)]
      // console.log(category)
      // console.log(cat[category])
      setSubs(category.subs)
    }

    const handleRange = (e) => {
      e.preventDefault();
      let x = e.target.value
      // console.log(x)
      setRange(x)
    }
    const handleTime = (e) => {
  
      let dateTime = e._d;
      setPublishTime(dateTime)

      // add this to check if it is time to post this.
      const mo1 = moment(dateTime).format() 
      let vx = moment(mo1).tz('America/Toronto').format()
        setPublishTime(vx)
      // const mo2 = moment(dateTime).tz("America/st_johns");
      // console.log(mo2)
      // console.table(date)
    }
    
    const handlePost = (e) => {
      e.preventDefault()
      let {title, author, readTime, category, subcategory, photos, subtitles, body} = e.target;
      let splitBody = body.value.split("\n")
      let output = {
        article: {
          title: title.value,
          author: author.value,
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
        console.log(response)
        if (response.status === 201) {
          setPosted(true)
        } else {
          
        }
      }).catch((error) => {
        console.log(error);
      })
    }
      useEffect(() => {
  
      }, [subs, posted])
      
      
      
    
  

      if (posted) {
        return(
            <div className={styles.container}>
            <h1>posted</h1>
            </div>
        )
      }


  return (
     <div className={styles.container}>
      <h3>Create Article</h3>
          <form onSubmit={handlePost}>
          <ul className={styles.list}>
        <li>
          <label>Title</label>
          <input name="title" type="text"   placeholder="Title" required />
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