import { parseCookies } from 'nookies';
import {React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Breaking.module.css';
import { useAppContext } from '../../context/AppContext'; 
import axios from  'axios';
import UpdateForm from '../../components/updateForm.js'


export default function Update() {
  let cats = useAppContext().hamburger
  let [subs, setSubs] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  let [search, setSearch] = useState("")
  let [selected, setSelected] = useState(false)
  let [range, setRange] = useState(6) 
  let [admin, setAdmin] = useState(false)
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
          //  setSuggestions(response.data)c
          // console.log(response.data)
          setSuggestions(response.data.articles)
        }
      })
      .catch(err =>{
        console.log(":(", err)
      });
    }
    }

    const handleClick = (e) => {
      console.log(e)
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
                        <h1 className={styles.title}>Update An Article</h1>
                        <ul className={styles.list}>
                          <li>
                            <label>Search by Name of Article</label>
                            <input name="title" type="text"   placeholder="Title of Article" onChange={getSuggestions} required />
                            { search.length > 1 ? (<div className={styles.suggestionsCont}>
                            {suggestions.map(suggestion => {
                                return(<div  className={styles.suggestion} onClick={handleClick.bind(this, suggestion)}>
                                      <h3  className={styles.suggestionTitle}>{suggestion.title}</h3>
                                      </div>

                                )
                            })}</div>) : (<div/>)}
                            {/* <button type="submit">Update Article</button> */}
                          </li>     
                        </ul> 
                  </div>) 
      }


   return (
          <UpdateForm suggestion={selected}/>
          )
}