import Head from 'next/head';
import Link from 'next/link';
import {useRouter } from 'next/router';
import categoryStyles from '../styles/Category.module.css';
import {useState, useEffect } from 'react';
import AddStory from '../components/AddStory.js';
import navStyles from '../styles/Nav.module.css';
import { useAppContext } from '../context/AppContext';

export default function Category({ topStory, header, category, subs}) {
  let subCats = useAppContext().subcatagories
  let [moreStories, setMoreStories] = useState([]);
  let [count, setCount] = useState(0)
  let [empty, setEmpty] = useState(true);
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  let route = useRouter();
  let test = route.asPath
  let [check, setCheck] = useState(test);
  // let trying = 0
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

  const handleClick = (e) => {
    if (category.length >  moreStories.length * 3) {

      let holder = [];
      let i;
      for( i = 0; i < 3; i++) {
        let helper = moreStories.length * 3;
        if(helper + i >= category.length) {
          setEmpty(true)
        } else {
          holder.push(category[ helper + i]);

        }
      }
      
    

      setMoreStories([...moreStories, holder])
        setCount(count + holder.length)

    } 
    if (category.length === count) {
      setEmpty(true)
    }
  
  }

  useEffect((ctx) => {
    
    if (category.length <= count) {
      setEmpty(true)
    } else {
      setEmpty(false)

    }
   

  }, [moreStories, count])

    let path = route.asPath;
    
    if (path === check) {
        
    } else {
        setCheck(path)
        setMoreStories([]);
        setCount(0)
    }

  



    let conditButton = empty ? (<div/>) : (<button onClick={handleClick} className={categoryStyles.moreBut}> MORE </button>)
   let style = empty ? ({ visibility: 'hidden', height: "0em"}) : ({ visibility: 'visible'})
  return (<div className={categoryStyles.mainContainer}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {subs.length > 0 ? (

          <ul className={navStyles.lowerNavBar}>
            { subs.map((x, ind)=> {
                
              //  let clickedLowerNavButtonStyle =  subClicked === x.name ? ({ color: 'black'}) : ({color: '#fffefe' })
              return (<li key={x.id}>
                <Link href="/subcategory/[subcategory]" as={`/subcategory/${x.name}`}>
                  <button className={navStyles.navButton} value={x.name}>{x.name}</button>
                </Link>   
        </li>)
      })}
      </ul>
      ) : (<div/>)}  
    <div className={categoryStyles.holder}>
        <div className={categoryStyles.indexContainer}>
          <h1 className={categoryStyles.title}> {header}</h1>
          <div className={categoryStyles.underline}/>
          <div className={categoryStyles.storiesContainer}>
            {topStory.map((x, ind)=> {
              let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
              return(
                 <Link key={x.id} href="article/[article]" as={`/article/${x.url}`}> 
                    <div className={styleArray[ind]}>
                    <h5 className={categoryStyles.catTitle}>{header}</h5>
                    <h5 className={categoryStyles.subCatTitle}>{subCats[x.subcategorization_id]}</h5>
                      <img src={x.fallback[0]} style={visible}  className={categoryStyles.img}/> 
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
          return(<AddStory key={ind} newStories={x} header={header}/>)
      })}
     {conditButton}
       </div> 

   </div>
      </main>
   </div>)
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URL}/categorizations`)

  const cats = await res.json();
  const paths = cats.map((x) => ({
    params: {  category: x.name.toString(),
    id: x.id.toString()},
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  
  const res = await fetch(`${process.env.BACKEND_URL}/categorizations/${params.category}`)
  const output = await res.json()
  let header = await output.header
  let subs = await output.subcategorizations || null
 
  let category = [];
  let topStory = []
  let holder = await output.articles.forEach((x, i) => {
    if (topStory.length < 5) {
      topStory.push(x)

    } else {
      category.push(x)
    }
  })
  return { props: { topStory, header, category, subs } }
}
