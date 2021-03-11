import {React, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
import { useAppContext } from '../context/AppContext'; 
import {securedAxiosInstance, plainAxiosInstance } from '../assets/backend/axios.js';
import { useRouter } from 'next/router';

import axios from 'axios';

const Nav = ({category, loggedIn, updateLogin}) => {
const router = useRouter()

    let [isLoggedIn, setIsLoggedIn] = useState();
  let globalState = useAppContext().catagories;
  let [subcategorization, setSubcategorization] = useState([])
  let [clicked, setClicked] = useState("")
  let [subClicked, setSubClicked] = useState("")
  let [didScroll, setDidScroll] = useState(false);
  let scrollNavStyle = didScroll ? ({ top: '0px', transition: 'top 0.4s ease-in-out' }) : ({ top: '-60px', transition: 'top 0.2s ease-in-out' })
  let lowerNavStyle = subcategorization.length >= 1 ? ({ visibility: 'visible', transition: '6ms' }) : ({ visibility: 'hidden', transition: '6ms' })
  //  let clickedNavButtonStyle =  >= 1 ? ({ visibility: 'visible', transition: '6ms' }) : ({ visibility: 'hidden', transition: '6ms' })
     const handleLogOut = async () => {
    axios.delete(`${process.env.BACKEND_URL}/logout`, {
             
      
           withCredentials: true,
           headers: {
             'Content-Type': 'none'
           }
         })
         .then(res => {

           setIsLoggedIn(res.data.logged_in);
        router.push("/")
           updateLogin();
         }).catch((error) => {
           console.log(error);
         });
        
     }
   
   const handleLogin = async () => {
     axios.get('http://localhost:3001/logged_in', {
         withCredentials: true,
         headers: {
           'Content-Type': 'none'
         }
       })
       .then(res => {
         setIsLoggedIn(res.data.logged_in);
       }).catch((error) => {
         console.log(error);
       });

   }
  
  const handleScroll = (e) => {
      if (window.scrollY < 83) {
        setDidScroll(false)
      } else if (window.scrollY > 83) {
        
        setDidScroll(true)

      } else {

      }

    }
    const handleClick = async (e) => {
      let output = Number(e.target.value);
      setClicked(output)
      category(globalState[output]);
      //  const res = await fetch(`https://wreck-house-press-back.herokuapp.com/subcategorizations?categorization_id=${output + 1}&&nav=${true}`)
      const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations?categorization_id=${output + 1}&&nav=${true}`)
      const data = await res.json();
      setSubcategorization(data);
      
    }
    const handleSubClick = (e) => {
      category(e.target.value);
      setSubClicked(e.target.value)
    }
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
       setIsLoggedIn(loggedIn)
      },[loggedIn]);
      let btn = isLoggedIn ? (<button className={navStyles.signIn} onClick={handleLogOut}>Sign Out</button>) : (< Link href="/login"><button className={navStyles.signIn}>Sign In</button></Link>)
  return (
   <div>

   <div className={navStyles.nav}>
        <Link href="/"><img src='/images/Masthead-2021.png'/></Link>
     {/* <Image
     src='/images/WH-Press-2021.png'
     alt="logo"
     width={500}
     height={250}/>   */}
 
        <button disabled='true ' className={navStyles.subscribe}>
          Subscribe
        </button>
          {isLoggedIn ? (<button className={navStyles.signIn} onClick={handleLogOut}>Sign Out</button>) : (< Link href="/login"><button className={navStyles.signIn}>Sign In</button></Link>)}
          
        </div>

      <div className={navStyles.underline}/>
      <ul className={navStyles.navbar}>
      { globalState.map((x, ind)=> {
        
         let clickedNavButtonStyle =  clicked === ind ? ({ color: '#59BCC0'}) : ({color: '#B9B7B7' })
       let url = ind + 1
       let link = ind === 0 ? ("/") : ("/[category]")
       return (<li key={x}>
        <Link href={link} as={`/${url.toString()}`}>
       < div className={navStyles.buttonHolder}>
        <button className={navStyles.navButton} onClick={handleClick} style={clickedNavButtonStyle} value={ind}>{x}</button>
       </div>
        </Link>   
        </li>)
      })}
        </ul>


      <ul className={navStyles.lowerNavBar} style={lowerNavStyle}>

            { subcategorization.map((x, ind)=> {
                   let clickedLowerNavButtonStyle =  subClicked === x.name ? ({ color: 'black'}) : ({color: '#fffefe' })
              return (<li key={x.id}>
                <Link href="/subcategory/[subcategory]" as={`/subcategory/${x.id}`}>
                  <button onClick={handleSubClick} className={navStyles.navButton} value={x.name} style={clickedLowerNavButtonStyle}>{x.name}</button>
                </Link>   
        </li>)
      })}
      </ul>
      <div className={navStyles.scrollNav} style={scrollNavStyle}>
        <Link href="/"><img src='/images/scrollIcon.png' className={navStyles.scrollNavImg}/></Link>
        <ul className={navStyles.scrollNavBar}>
          { globalState.map((x, ind)=> { 
              let clickedNavButtonStyle =  clicked === ind ? ({ color: '#59BCC0'}) : ({color: '#B9B7B7' })
              let url = ind + 1
              let link = ind === 0 ? ("/") : ("/[category]")
               return (
                 <li key={x}>
                  <Link href={link} as={`/${url.toString()}`}>
                   <div className={navStyles.buttonHolder}>
                    <button className={navStyles.navButton} onClick={handleClick} style={clickedNavButtonStyle} value={ind}>{x}</button>
                   </div> 
                  </Link>   
                  </li>)
           })}
        </ul>
      </div>
    </div>
  )
}

export default Nav