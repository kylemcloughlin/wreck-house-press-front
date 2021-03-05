import Head from 'next/head';
import Link from 'next/link';
// import { useAppContext } from '../context/AppContext';
// import {useEffect, useState } from 'react';
// import {securedAxiosInstance, plainAxiosInstance } from '../assets/backend/axios.js'
import categoryStyles from '../../styles/Category.module.css';




export default function Subcategory({ subcategory }) {
    let header = subcategory.header
    console.log("SUBCATEGORY", subcategory);
    let articles = subcategory.articles;
    let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  
  return (
    <div>
      <Head>
        <title>{header}</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={categoryStyles.indexContainer}>
        <h1 className={categoryStyles.title}>{header}</h1>
        <div className={categoryStyles.underline}/>
        <div className={categoryStyles.storiesContainer}>
    {articles.map((x, ind)=> {
       let visible = ind === 0 ? ({ visibility: 'visible', width: '40%'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
        return(
        <Link key={x.id} href="/article/[article]" as={`/article/${x.id}`}>
            <div value="xxx" className={styleArray[ind]}>
          <img src={x.photos} style={visible} className={categoryStyles.img}/> 
          <h6>{header}</h6>
          <h1>{x.title}</h1>
        {/* <h4 style={visible}>{x.subtitles}</h4> */}
              <h6>20 hrs ago</h6>
         </div>
        </Link>
        )
      })}
        
        </div>
    </div>
    </div>)
      
      
      /* 
      
      </div> */
  
}


export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations`)
  const cats = await res.json();
  const paths = cats.map((x) => ({
    params: {
      subcategory: x.id.toString()
    },
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({
  params
}) {
  const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations/${params.subcategory}`)
  const subcategory = await res.json()

  return {
    props: {
      subcategory
    }
  }
}
