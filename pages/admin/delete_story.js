import { parseCookies } from 'nookies';
import Link from 'next/link';
import {React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Breaking.module.css';
import { useAppContext } from '../../context/AppContext'; 
import axios from  'axios';
import UpdateForm from '../../components/updateForm.js'


export default function DeleteStory() {
  let cats = useAppContext().hamburger
  let subCats = useAppContext().subcatagories;
  let cata = useAppContext().catagories;
  let [subs, setSubs] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  let [search, setSearch] = useState("")
  let [selected, setSelected] = useState(false)
  let [range, setRange] = useState(6) 
  let [admin, setAdmin] = useState(false)
  let [complete, setComplete] = useState(false)  
  const router = useRouter();

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
  
    

    const getSuggestions = (e) => {
      let input = e.target.value
      setSearch(input)
      // console.log(e.target.value)
      if (input.length < 1) {
          console.log('hithtihtih', input.length)
      } else {
          console.log(input.length)

      axios.get(`${process.env.BACKEND_URL}/search?output=${input}`)
      .then(response => {
        if (response.status === 200) {
          setSuggestions(response.data.articles)
        }
      })
      .catch(err =>{
        console.log(":(", err)
      });
    }
    }

    const handleClick = (e) => {
      // console.log(e)
      setSelected(e)
      setSearch("")
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
           router.replace('/')
         }
       }).catch((error) => {
         console.log(error);
         router.replace('/')


       });

   }

   const countDown = (x) => {
     let input = null
     if (x.legacy === 't') {
       input = x.originalPost
     } else {
       input = x.publish_time
     }
     let date1 = new Date(input);
     let date2 = new Date(); // 9:00 AM
     let diff = date2 - date1;
     let msec = diff;
     let ss = Math.floor(msec / 1000);
     let mm = Math.floor(msec / 1000 / 60);
     let hh = Math.floor(msec / 1000 / 60 / 60);
     let days = Math.floor(hh / 24)
     let years = Math.floor(days / 365)


if (years > 1) {
  return `posted ${years} years ago`;
} else if (years === 1) {
  return `posted ${years} year ago`;
} else if (days > 1) {
  return `posted ${days} days ago`;

} else if (days === 1) {
  return `posted ${days} day ago`;

} else if (hh > 1) {
  return `posted ${hh} hours ago`;

} else if (hh === 1) {
  return `posted ${hh} hour ago`;

} else if (mm > 1) {
  return `posted ${mm} minutes ago`;

} else if (mm === 1) {
  return `posted ${mm} minute ago`;

} else {
  return `posted ${ss} seconds ago`;

}
   }

   const handleDelete= (e) =>{
     console.log(selected.url)
     axios.delete(`${process.env.BACKEND_URL}/articles/${selected.url}`, {
           withCredentials: true,
           headers: {
             'Content-Type': 'none'
           }
          }).then(res => {
             console.log(res)
            if(res.status === 204) {
              setComplete(true)
            }

           }).catch(err => {
            alert(`Status Code: ${err.response.status} article not found`)

           })

   }

    useEffect((ctx) => {
      const {Bearer} = parseCookies(ctx);
      if (!Bearer) {
        // router.replace("/");
        console.log(suggestions)
        handleLogin();
      } 
        },[suggestions]);

      
    if(!selected) {
          return (<div className={styles.container}>
                        <h1 className={styles.title}>Search Article by Title</h1>
                        <ul className={styles.list}>
                          <li>
                            <label>Search by Title of Article</label>
                            <input name="title" type="text"   placeholder="Title of Article" onChange={getSuggestions} required />
                            { search.length > 1 ? (<div className={styles.suggestionsCont}>
                            {suggestions.map(suggestion => {
                                return(<div  className={styles.suggestion} onClick={handleClick.bind(this, suggestion)}>
                                          <h5 className={styles.catTitle}>{cata[suggestion.categorization_id]}</h5>
                                          <h5 className={styles.subCatTitle}>{subCats[suggestion.subcategorization_id]}</h5>
                                          <img src={suggestion.photos[0]} className={styles.img}/> 
                                          <h3 className={styles.suggestionTitle}>{suggestion.title}</h3>
                                          <h6 className={styles.date}>{countDown(suggestion)}</h6>
                                      </div>

                                )
                            })}</div>) : (<div/>)}
                            {/* <button type="submit">Update Article</button> */}
                          </li>     
                        </ul> 
                  </div>) 
      }


   return (
          <div>
           {complete ? (    <div className={styles.container}>
          <h2  className={styles.completeTitle}>Complete</h2>
          <h4 className={styles.completeTitle}>Article has been deleted, return home or refresh the page to delete another.</h4>
          <Link  href="/">
              <button className={styles.homeBtn}>Home</button>
          </Link>
          </div>): (
             
             <div className={styles.container}>
             <h1 className={styles.title}>{selected.title}</h1>
             <p className={styles.title}>are you sure you want to delete this article?</p>
             <div className={styles.title}>
             <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
             <Link href="/">
             <button className={styles.cancelBtn}>Home</button>
             </Link>
             </div>
             </div>
             )}
             </div>
             )
}