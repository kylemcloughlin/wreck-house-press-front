import Head from 'next/head';
import Link from 'next/link';
// import { useAppContext } from '../context/AppContext';
import {useEffect, useState } from 'react';
import AddStory from '../../components/AddStory.js';
import categoryStyles from '../../styles/Category.module.css';
import navStyles from '../../styles/Nav.module.css';

 
export default function Subcategory({ topStory, header, category, subs}) {
  let [moreStories, setMoreStories] = useState([]);
  let [empty, setEmpty] = useState(true);
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  let style = empty ? ({ visibility: 'hidden', height: "0em"}) : ({ visibility: 'visible'})
  
  const handleClick = (e) => {
    if (category.length >  moreStories.length * 3) {
      
      let holder = [];
      for(let i = 0; i < 3; i++) {
        let helper = moreStories.length * 3 
        if(helper + i >= category.length) {
          console.log(helper + i, category.length)
          console.log("hithithiti")
          setEmpty(true)
        } else {
          holder.push(category[ helper + i]);
          
        }
        setCount(count++)
      }
      

      setMoreStories([...moreStories, holder])
      
    } 
    if (category.length === count) {
      setEmpty(true)
    }
  }
  const countDown = (x) => {
    let date2 = new Date(); // 9:00 AM
    let date1 = new Date(x);
    let diff = date2 - date1;
    let msec = diff;
    let ss = Math.floor(msec / 1000);
    let mm = Math.floor(msec / 1000 / 60);
    let hh = Math.floor(msec / 1000 / 60 / 60);
    let days = Math.floor(hh / 24)
    let years = Math.floor(days / 365)
    // let year  = 
    // console.log(`years: ${years} days: ${days} hh: ${hh / 24} mm: ${mm} `)
    if (years > 0) {
      return `posted ${years} years ago`;
    } else if (days > 0) {
      return `posted ${days} days ago`;
      
    } else if ( hh > 0) {
      return `posted ${hh} hours ago`;
      
    } else if (mm > 0) {
      return `posted ${mm} minutes ago`;
      
    } else  {
      return `posted ${ss} seconds ago`;
      
    }
    
    
  }
    useEffect((ctx) => {
    if (category.length === count) {
      setEmpty(true)
    } else {
      setEmpty(false)

    }
   
  }, [moreStories])
  return (<div className={categoryStyles.mainContainer}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

             <ul className={navStyles.lowerNavBar}>
            { subs.map((x, ind)=> {
              console.log(x)
              //  let clickedLowerNavButtonStyle =  subClicked === x.name ? ({ color: 'black'}) : ({color: '#fffefe' })
              return (<li key={x.id}>
                <Link href="/subcategory/[subcategory]" as={`/subcategory/${x.name}`}>
                  <button className={navStyles.navButton} value={x.name}>{x.name}</button>
                </Link>   
        </li>)
      })}
      </ul>
    <div className={categoryStyles.holder}>
        <div className={categoryStyles.indexContainer}>
          <h1 className={categoryStyles.title}> {header}</h1>
          <div className={categoryStyles.underline}/>
          <div className={categoryStyles.storiesContainer}>
            {topStory.map((x, ind)=> {
              let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
              return(
                 <Link key={x.id} href="/article/[article]" as={`/article/${x.url}`}> 
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
    params: {  subcategory: x.name.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.BACKEND_URL}/subcategorizations/${params.subcategory}`)
  const output = await res.json()
  let header = await output.header
  let subs = await output.subcategorizations || null
  console.log('HEHEHEHEHEHEHEHEHEHEHEHEHEH', subs)
  let category = [];
  let topStory = []
  let holder = await output.articles.forEach((x, i) => {
    if (topStory.length < 5) {
      topStory.push(x)

    } else {
      category.push(x)
    }
  })
  return { props: { topStory, header, category, subs} }
}
