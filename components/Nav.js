import {React, useState, useEffect } from 'react';
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
import { useAppContext } from '../context/AppContext'; 
import { useRouter } from 'next/router';
import {destroyCookie} from 'nookies';
import Hamburger from '../components/Hamburger';
const Nav = ({category, loggedIn}) => {

const router = useRouter()
  let [isLoggedIn, setIsLoggedIn] = useState(loggedIn);   
  let globalState = useAppContext().catagories;
  let [subcategorization, setSubcategorization] = useState([])
  let [clicked, setClicked] = useState("")
  let [subClicked, setSubClicked] = useState("")
  let [didScroll, setDidScroll] = useState(false);
  let [toggle, setToggle] = useState(false);
  let scrollNavStyle = didScroll ? ({ top: '0px', transition: 'top 0.4s ease-in-out' }) : ({ top: '-60px', transition: 'top 0.2s ease-in-out' })
 
  let style = toggle ? ({ display: 'block' }) : ({ display: 'none' })
 
  // let lowerNavStyle = subcategorization.length >= 1 ? ({ visibility: 'visible', transition: '6ms' }) : ({ visibility: 'hidden', transition: '6ms' })
     const handleLogOut = () => {
         setToggle(!toggle)
       destroyCookie(null, "Bearer",{ path: '/'});
       router.replace("/")
       setIsLoggedIn(false)
        // router.replace('/');
        
     }
  
const handleToggle = (event) => {
  
  setToggle(!toggle)
    // document.getElementById("myDropdown").classList.toggle(navStyles.show);
  }

  // Close the dropdown menu if the user clicks outside of it
  const handleScroll = (e) => {
    if (window.scrollY < 110) {
      setDidScroll(false)
    } else if (window.scrollY > 100) {
      
      setDidScroll(true)
      
    }
    else {
      
    }
    
  }
  const handleClick = async (e) => {
    let output = Number(e.target.value);
    setClicked(output)
    category(globalState[output]);
    //  const res = await fetch(`https://wreck-house-press-back.herokuapp.com/subcategorizations?categorization_id=${output + 1}&&nav=${true}`)
    const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations?categorization_id=${output}&&nav=${true}`)
    const data = await res.json();
    setSubcategorization(data);
    
  }
 

  useEffect((ctx) => {
    window.addEventListener('scroll', handleScroll);
   
    
      if (loggedIn === true ) {
        setIsLoggedIn(loggedIn)
          // handleTrue();
       }
      
      
      setIsLoggedIn(loggedIn)
       
      },[loggedIn]);
  return (
   <div>

   <div className={navStyles.nav}>
    <div  className={navStyles.HamburgerHolder}>
        <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
    </div>
        <Link  href="/"><img  className={navStyles.img} src='/images/Masthead-2021.png'/></Link>
                    {/* {isLoggedIn ? (<button className={navStyles.mobileSignOut} onClick={handleLogOut}>Sign Out</button>) : (< Link href="/login"><img className={navStyles.mobileSignIn} src="/images/user.png"/></Link>)} */}
        <Link href="/subscribe" as='subscribe'> 
        <button className={navStyles.subscribe}>
          Subscribe
        </button>
        </Link>
         
          {isLoggedIn ? (<div className={navStyles.dropdown}> 
                          <button onClick={handleToggle} className={navStyles.dropbtn}><img className={navStyles.dropImg} src="/images/user.png"/></button>
                            <div id="myDropdown" className={navStyles.dropdownContent} style={style}>
                            <a onClick={handleLogOut}>Sign Out</a>
                          <Link href="/user/settings"><a onClick={handleToggle}>User Settings</a></Link>
                            </div>
</div>) : (< Link href="/login"><button className={navStyles.signIn}>Sign In</button></Link>)}
          
        </div>
              {isLoggedIn ? (<a href="https://drive.google.com/file/d/1fCjIHLG1ZaG4m66MiHPKz_3wuWpN-_fP/view"><button className={navStyles.pdfButton}>Current Issue</button></a>) : (<div/>)}
      <div className={navStyles.underline}/>
      <ul className={navStyles.navbar}>
      { globalState.map((x, ind)=> {
         let clickedNavButtonStyle =  clicked === ind ? ({ color: '#59BCC0'}) : ({color: '#B9B7B7' })
       let url = ind === 0 ? ("") : (x)
       let link = ind === 0 ? ("/") : ("/[category]")
       return (<li key={x}>
        <Link href={link} as={`/${url}`}>
       < div className={navStyles.buttonHolder}>
        <button className={navStyles.navButton} onClick={handleClick} style={clickedNavButtonStyle} value={ind}>{x}</button>
       </div>
        </Link>   
        </li>)
      })}
        </ul>
      <div className={navStyles.scrollNav} style={scrollNavStyle}>
        <Link href="/"><img src='/images/scrollIcon.png' className={navStyles.scrollNavImg}/></Link>
        <ul className={navStyles.scrollNavBar}>
          { globalState.map((x, ind)=> { 
              let clickedNavButtonStyle =  clicked === ind ? ({ color: '#59BCC0'}) : ({color: '#B9B7B7' })
              let url = ind === 0 ? ("") : (x)
              let link = ind === 0 ? ("/") : ("/[category]")
               return (
                 <li key={x}>
                  <Link href={link} as={`/${url}`}>
                   <div className={navStyles.buttonHolder}>
                    <button className={navStyles.navButton} onClick={handleClick} style={clickedNavButtonStyle} value={ind}>{x}</button>
                   </div> 
                  </Link>   
                  </li>)
           })}
            <Link href="/subscribe" as='subscribe'> 
              <button className={navStyles.scrollSubscribe}> Subscribe </button>
          </Link>
            {isLoggedIn ? (<button className={navStyles.scrollSignOut} onClick={handleLogOut}>Sign Out</button>) : (< Link href="/login"><img className={navStyles.scrollNavSignIn} src="/images/user.png"/></Link>)}
        </ul>
      </div>
    </div>
  )
}

export default Nav