import {React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import navStyles from '../styles/Nav.module.css';
import { useAppContext } from '../context/AppContext'; 
import {securedAxiosInstance, plainAxiosInstance } from '../assets/backend/axios.js';

const Nav = ({category}) => {
  let globalState = useAppContext()
  let [subcategorization, setSubcategorization] = useState([])
  let lowerNavStyle = subcategorization.length >= 1 ? ({ visibility: 'visible', transition: '6ms' }) : ({ visibility: 'hidden', transition: '6ms' })
  const handleClick = async (e) => {
    let output = Number(e.target.value);
    category(globalState.catagories[output]);
      await plainAxiosInstance.get(`/subcategorizations?categorization_id=${output + 1}`)
    .then(res => {
      
      setSubcategorization(res.data)
    })
    .catch(() => {
      console.log('err')
    })
  }
  const handleSubClick = (e) => {
 category(e.target.value);
  }
  return (
   <div>

   <div className={navStyles.nav}>
        <Link href="/"><img src='/images/WH-Press-2021.png'/></Link>
     {/* <Image
     src='/images/WH-Press-2021.png'
     alt="logo"
     width={500}
     height={250}/>   */}
 

        </div>
      <ul className={navStyles.navbar}>
      { globalState.catagories.map((x, ind)=> {
        return (<li key={x}>
        <Link href="/category"><button className={navStyles.navButton} onClick={handleClick} value={ind}>{x}</button></Link>   
        </li>)
      })}
        </ul>
      <ul className={navStyles.lowerNavBar} style={lowerNavStyle}>

            { subcategorization.map((x, ind)=> {
              return (<li key={x.id}>
                <Link href="/subcategory"><button onClick={handleSubClick} className={navStyles.navButton} value={x.name}>{x.name}</button></Link>   
        </li>)
      })}
      </ul>

      </div>
  )
}

export default Nav