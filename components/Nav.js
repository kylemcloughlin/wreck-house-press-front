import {React, useState } from 'react';
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css'
import { useAppContext } from '../context/AppContext'; 
import {securedAxiosInstance, plainAxiosInstance } from '../assets/backend/axios.js'

const Nav = ({category}) => {
  let globalState = useAppContext()
  let [subcategorization, setSubcategorization] = useState([])
  const handleClick = async (e) => {
    let output = Number(e.target.value);
    category(globalState.catagories[output]);
      await plainAxiosInstance.get(`/subcategorizations?categorization_id=${output + 1}`)
    .then(res => {
      // console.log(res)
      // console.log(res.data)
      
      setSubcategorization(res.data)
    })
    .catch(() => {
      console.log('err')
    })
  }
  const handleSubClick = (e) => {
    // console.log(globalState)
        // let output = Number(e.target.value);
 category(e.target.value);
  }
  return (
    <div className={navStyles.nav}>

      <ul>
        <li>
     <Link href="/">home</Link>   
        </li>
      { globalState.catagories.map((x, ind)=> {
        return (<li key={x}>
        <Link href="/category"><button onClick={handleClick} value={ind}>{x}</button></Link>   
        </li>)
      })}
            { subcategorization.map((x, ind)=> {
        return (<li key={x.id}>
        <Link href="/subcategory"><button onClick={handleSubClick} value={x.name}>{x.name}</button></Link>   
        </li>)
      })}
    </ul>

    </div>
  )
}

export default Nav