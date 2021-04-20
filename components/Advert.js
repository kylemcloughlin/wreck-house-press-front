
import React from 'react';
import {useEffect, useState } from 'react';
import indexStyles from '../styles/Index.module.css';
import axios from 'axios';

const Advert = () => {
    let [ad, setAd] = useState()
    let [visable, setVisable] = useState()

   
  let handleClick = () => {
    axios.get(`${process.env.BACKEND_URL}/advertisements`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'none'
        }
      })
      .then((response) => {
          
          setAd(response.data)
          setVisable(response.data.visable)
      }).catch((err) => {
        console.log(err)
      })
  } 
  useEffect(() => {
handleClick()

  },[])
       
  
  return ( <div>
            {visable ? (<a href={ad.link}>< img className={indexStyles.ad} src={ad.img} border="0" /></a>) : (<div/>)} 
           </div>
         )
}
export default Advert

