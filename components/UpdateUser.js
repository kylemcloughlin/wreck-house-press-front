import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';

const UpdateUser = (ctx) => {
  let [complete, setComplete] = useState(false)  
  let [admin, setAdmin] = useState(false)
  let [email, setEmail] = useState("")
  let [subscription, setSubscription] = useState(false)
  let [search, setSearch] = useState(false);
  let [suggestions, setSuggestions] = useState([]);

  
  const getSuggestions = (e) => {
    let input = e.target.value
    setSearch(input)
    // console.log(e.target.value)
    if (input.length < 1) {
      console.log('hithtihtih', input.length)
    } else {
      console.log(input.length)

      axios.get(`${process.env.BACKEND_URL}/over_ride?output=${input}`)
        .then(response => {
          console.log(response)
          // if (response.status === 200) {
          //   setSuggestions(response.data.articles)
          // }
        })
        .catch(err => {
          console.log(":(", err)
        });
    }
  }

  const router = useRouter();
  const handlePost = (e) => {
    e.preventDefault();
    if (subscription === false) {
      alert('missing subscription length')
    } else  {
      let {newEmail} = e.target;
      axios.post(`${process.env.BACKEND_URL}/new_email`, {
        email: newEmail.value,
        subscription_length: subscription
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        setEmail(newEmail.value);
        setComplete(true)
        
      }).catch((error) => {
        console.log(error);
        //  router.replace('/')
      });
    }



  }
  
    const handleSelect = (e) => {
      console.log(e.target.value)
      if (e.target.value === 'false') {
        setSubscription(false)
      } else {
        setSubscription(e.target.value)
        
      }
    }
  const refresh = () => {
    router.reload()
  }
  
//  if(complete) {
//         return(
//           <div className={styles.container}>
//           <h2  className={styles.completeTitle}>Complete</h2>
//           <h4 className={styles.completeTitle}>User has been updated, new information:</h4>
//           <h4 className={styles.completeTitle}>New Information Here</h4>
          
//           <Link  href="/">
//               <button className={styles.homeBtn}>Home</button>
//           </Link>
//               <button className={styles.anotherBtn} onClick={refresh}>BROKEN BUTTON</button>
//           </div>
//         )
//       }

  return(<div className={styles.userContainer}>
      <h2  className={styles.completeTitle}>Update User's information</h2> 
<ul className={styles.list}>
                          <li>
                            <label>Search User By Email</label>
                            <input name="title" type="text"   placeholder="search by email" onChange={getSuggestions} required />
                            { search.length > 1 ? (<div className={styles.suggestionsCont}>
                            {suggestions.map(suggestion => {
                                return(<div  className={styles.suggestion} onClick={handleClick.bind(this, suggestion)}>
                                          
                                      </div>

                                )
                            })}</div>) : (<div/>)}
                            {/* <button type="submit">Update Article</button> */}
                          </li>     
                        </ul> 
          {/* <form onSubmit={handlePost}>
            <button type="submit" className={styles.createBtn}>Update</button>
          </form> */}
          </div>)
}
export default UpdateUser
