import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment-timezone';
import styles from '../../styles/Breaking.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';


export default function Advert(ctx) {
  let [complete, setComplete] = useState(false)  
  let [admin, setAdmin] = useState(false)
  let [email, setEmail] = useState("")
  let [advertId, setAdvertId] = useState()
  let [publishTime, setPublishTime] = useState()  
  const router = useRouter();


  const handleTime = (e) => {
      let dateTime = e._d;
      const mo1 = moment(dateTime).format() 
      let vx = moment(mo1).tz('America/Toronto').format()
        setPublishTime(vx)
  
    }
    
  const handlePost = (e) => {
    e.preventDefault();
    let {link, image} = e.target;
    if(publishTime === null) {
      alert("NEED TO PICK A TIME TO PUBLISH")
    } else {

      axios.post(`${process.env.BACKEND_URL}/advertisements`, {
        link: link.value,
        image: image.value,
        publish:  publishTime,
        visable: true
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        
        if(res.status === 200) {
            setComplete(true)
        }
      }).catch((error) => {
        console.log(error);
        
      });
      
    }
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
            axios.get(`${process.env.BACKEND_URL}/advertisements`, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'none',
                  "Authorization": Bearer
                }
              })
              .then(res => {
                setAdvertId(res.data.id)
                
              })
              .catch(err => {
                console.log(err)
              })


         } else {
           router.replace('/')
         }
       }).catch((error) => {
         console.log(error);
         router.replace('/')


       });

   }
  const refresh = () => {
    router.reload()
  }
   const handleAdToggle = () => {
      axios.put(`${process.env.BACKEND_URL}/advertisements/${advertId}`, {
        visable: false
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        
        if(res.status === 200) {
            alert("Advertisemnt has been removed")            
        }
      }).catch((error) => {
        console.log(error);
        
      });


   }

  useEffect(() => {
     handleLogin()
   }, [])
 if(complete) {
        return(
          <div className={styles.container}>
          <h2  className={styles.completeTitle}>Complete</h2>
          <h4 className={styles.completeTitle}>Ad has been scheduled to Publish</h4>
          <Link  href="/">
              <button className={styles.homeBtn}>Home</button>
          </Link>
           
          </div>
        )
      }

  return(<div className={styles.postContainer}>
           <h2  className={styles.completeTitle}>Advertising</h2> 
          <form onSubmit={handlePost}>
            <h2 className={styles.completeTitle}>invite new user to join website by email.</h2>
            <div className={styles.inputHolder}>
            <label className={styles.adLabelTwo}>Advert Image</label>
            <input name="image" type="text" className={styles.adInput} placeholder="Advertise Image" required/>
            </div>
            <div className={styles.inputHolder}>
              <label className={styles.adLabel}>Advert link</label>
              <input name="link" type="text" className={styles.adInput} placeholder="link to website" required/>
            </div>
            <div className={styles.dateTimeHolderTwo}>
              <label>Publish Time</label>
              <Datetime onChange={handleTime}/>
            </div>
            <button type="submit" className={styles.createBtn}>Create</button>
          </form>
            <button type="submit" className={styles.removeBtn} onClick={handleAdToggle}>Remove Current Ad</button>

          </div>)

}