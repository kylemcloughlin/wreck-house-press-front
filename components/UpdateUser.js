import {React, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Breaking.module.css';
import loginStyles from '../styles/Login.module.css';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useSpring, animated } from 'react-spring';

const UpdateUser = (ctx) => {
  let [complete, setComplete] = useState(false)  
  let [user, setUser] = useState([])
  let [email, setEmail] = useState("")
  let [updated, setUpdated] = useState(false)
  let [subscription, setSubscription] = useState('original')
  let [search, setSearch] = useState(false);
  let [admin, setAdmin] = useState('original');
  const [mes, setMessage] = useState('')
  const props = useSpring({
            height: mes ? 150 : 0,
            transform: 'translate3d(0,0,0)',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            overflow: 'hidden',
            opacity: '.6',
    
  
            config: {
              duration: 400
            },
           
          })
  const router = useRouter();
  
  
  const handleFetch = (e) => {
    e.preventDefault();
    let input = e.target.email.value
    setSearch(input)
    axios.post(`${process.env.BACKEND_URL}/over_ride`, {
        email: e.target.email.value,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.status ===  200) {
          setComplete(true)
        }
          setUser(response.data)
       
        })
        .catch(err => {
          setMessage("Update User's information")
          handleError()
          if (err.response.status === 422) {
            
          }
          console.log(":(", err)
        });
      }
      
      const HandleUpdate = (e) => {
        e.preventDefault();
        axios.post(`${process.env.BACKEND_URL}/over_ride_update`, {
          email: search,
          admin: admin,
          subscription: subscription
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
            setUpdated(true)
          }
             setUser(response.data)

           })
           .catch(err => {
             if (err.response.status === 422) {
               console.log('hit')
             }
             console.log(":(", err)
           });
         
      }
  
  
  
    const handleAdminSelect = (e) => {
      console.log(e.target.value)
      if (e.target.value === 'original') {
        setAdmin('original')
      } else {
        setAdmin(e.target.value)
        
      }
    }
     const handleSubscriptionSelect = (e) => {
      console.log(e.target.value)
      if (e.target.value === 'original') {
        setSubscription('original')
      } else {
        console.log("hhhihih")
        setSubscription(e.target.value)  
      }
    }
      function handleError() {
    setTimeout(function () { setMessage(false)}, 3000);
  }  
  // const refresh = () => {
  //   router.reload()
  // }
  
 if(complete) {
  console.log(user)  
  return(
          <div className={styles.userContainer}>
           <h2  className={styles.completeTitle}>Update User's information</h2> 
          {updated ? (
               <div>     
                 <h4 className={styles.completeTitle}>User has been updated, new information:</h4>
                 <h4 className={styles.completeTitle}>New Information Here</h4>
                 <Link  href="/">
                  <button className={styles.userHomeBtn}>Home</button>
                 </Link>
                 {/* <button className={styles.anotherBtn} onClick={refresh}>Update Another</button>  */}
               </div>
        ) : (
          
          <div className={styles.userInfoDiv}>
            <h4>Customer id: <i>{user.c_id === null ? ('none') : (user.c_id)}</i></h4>
            <h4>Subscription id: <i>{user.s_id  === null ? ('none') : (user.s_id)}</i></h4>
            <h4>Subscription Expiry Date: <i>{user.expiry === null ? ('none') : (user.expiry)}</i></h4>
           <label>New Expiry:</label>
            <select name="subscription"  className={styles.split} onChange={handleSubscriptionSelect}>
              <option value="original">{user.expiry  === null ? ('none') : (user.expiry)}</option>
              <option value="3">Plus 3 months from today</option>
              <option value="6">Plus 6 months from today</option>
              <option value="annual">annual plan</option>
            </select>  
            <h4>Admin: <i>{user.admin  === false ? ('Subscriber') : ('Admin')}</i></h4>
           <label>New Admin:</label>
            <select name="admin"  className={styles.split} onChange={handleAdminSelect}>
              <option value="original">{user.admin  === false ? ('Subscriber') : ('Admin')}</option>
              <option value="opposite">{user.admin  !== false ? ('Subscriber') : ('Admin')}</option> 
            </select>  
              <button className={styles.updateUserBtn} onClick={HandleUpdate}>Update User</button>
          </div>
        )}
          </div>
        )
      }

  return(<div className={styles.userContainer}>
  <div className={styles.title}>
      <animated.div style={props} className={loginStyles.error}>
        <p className={loginStyles.message}>User Not Found</p>
      </animated.div> 
  </div>
      <h2  className={styles.completeTitle}>{mes}</h2> 
<ul className={styles.list}>
                          <form onSubmit={handleFetch}>
                          <li>
                            <label>Search User By Email</label>
                            <input name="email" type="text" placeholder="search by email"  required />
                            <button type="submit" className={styles.btn}>search</button>
                          </li>
                          </form>     
                        </ul> 
          {/* <form onSubmit={handlePost}>
            <button type="submit" className={styles.createBtn}>Update</button>
          </form> */}
          </div>)
}
export default UpdateUser
