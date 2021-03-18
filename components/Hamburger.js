import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import styles from '../styles/Hamburger.module.css';  
import { useAppContext } from '../context/AppContext'; 
import Link from 'next/link';

const Hamburger = () => {
    let globalState = useAppContext().catagories;
  
  return (
    <Menu>
      <ul>
     { globalState.map((x, ind)=> {
      //  let clickedNavButtonStyle =  clicked === ind ? ({ color: '#59BCC0'}) : ({color: '#B9B7B7' })
       let url = ind + 1
       let link = ind === 0 ? ("/") : ("/[category]")
       return (<li key={x}>
        <Link href={link} as={`/${url.toString()}`}>
        <button value={ind}>{x}</button>
        </Link>   
        </li>)
      })}
      </ul>
    </Menu>
  );
}
export default Hamburger

