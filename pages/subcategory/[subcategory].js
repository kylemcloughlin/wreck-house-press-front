import Head from 'next/head';
import Link from 'next/link';
// import { useAppContext } from '../context/AppContext';
import {useEffect, useState } from 'react';
import AddStory from '../../components/AddStory.js';
import categoryStyles from '../../styles/Category.module.css';


 
export default function Subcategory({ topStory, header, category}) {
  let [moreStories, setMoreStories] = useState([]);
  let [empty, setEmpty] = useState(true);
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  useEffect(() => {
      if (category.length === 0){
        setEmpty(true)
      } else {
           setEmpty(false)
      }
  },[])
  
  const handleClick = (e) => {
     if (category.length > 0) {
       let holder = category.splice(0, 3)
       setMoreStories([...moreStories, holder])
     } else {
          setEmpty(true)
     }
  }
   const countDown = (x) => {
     let today = new Date();
   const oneDay = 24 * 60 * 60 * 1000;
   let secondDate = new Date(x);
   const diffDays = Math.round(Math.abs((today - secondDate) / oneDay));
   return `posted ${diffDays} day's ago`;
   }
  let style = empty ? ({ visibility: 'hidden', height: "0em"}) : ({ visibility: 'visible'})

  return (<div className={categoryStyles.mainContainer}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
    <div className={categoryStyles.holder}>
        <div className={categoryStyles.indexContainer}>
          <h1 className={categoryStyles.title}> {header}</h1>
          <div className={categoryStyles.underline}/>
          <div className={categoryStyles.storiesContainer}>
            {topStory.map((x, ind)=> {
              let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
              return(
                 <Link key={x.id} href="/article/[article]" as={`/article/${x.id}`}> 
                <div className={styleArray[ind]}>
                  <h5 className={categoryStyles.catTitle}>{header}</h5>
              
                    <img src={x.fallback[0]} style={visible}  className={categoryStyles.img}/> 
                  {/* <img src={x.photos} style={visible} className={categoryStyles.img}/>  */}
                {/* </div> */}
              
                <h2 className={categoryStyles.artTitle}>{x.title}</h2>
                <h6 className={categoryStyles.date}>{countDown(x.originalPost)}</h6>
                <div className={categoryStyles.imgBarrier}/>
                <div/>
                </div>
                </Link>
      )
    })}
        </div>
      {moreStories.map((x, ind)=> {
        return(<AddStory key={ind} newStories={x}/>)
      })}
      <button onClick={handleClick} className={categoryStyles.moreBut} style={style}> MORE </button>
       </div> 
       

   </div>
      </main>
   </div>)
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations`)

  const subcats = await res.json();
  const paths = subcats.map((x) => ({
    params: {  subcategory: x.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations/${params.subcategory}`)
  const output = await res.json()
  let header = await output.header
  let subs = await output.subcategorizations || null
  console.log(subs)
  let category = [];
  let topStory = []
  let holder = await output.articles.forEach((x, i) => {
    if (topStory.length < 5) {
      topStory.push(x)

    } else {
      category.push(x)
    }
  })
  return { props: { topStory, header, category} }
}
