import Head from 'next/head';
import Link from 'next/link';
import {useRouter } from 'next/router'
import categoryStyles from '../styles/Category.module.css';
import {useState } from 'react';
import AddStory from '../components/AddStory.js';
import navStyles from '../styles/Nav.module.css';


export default function Category({ topStory, header, category, subs}) {
  let [moreStories, setMoreStories] = useState([]);
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  console.log(subs)
  
  const handleClick = (e) => {
    let holder =  category.splice(0, 3)
    setMoreStories([...moreStories, holder])
  }



  return (<div className={categoryStyles.mainContainer}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {subs ? (

          <ul className={navStyles.lowerNavBar}>
            { subs.map((x, ind)=> {
              //  let clickedLowerNavButtonStyle =  subClicked === x.name ? ({ color: 'black'}) : ({color: '#fffefe' })
              return (<li key={x.id}>
                <Link href="/subcategory/[subcategory]" as={`/subcategory/${x.id}`}>
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
                 <Link key={x.id} href="article/[article]" as={`/article/${x.id}`}> 
                <div className={styleArray[ind]}>
                  <h5 className={categoryStyles.catTitle}>{header}</h5>
              
                    <img src={x.photos} style={visible}  className={categoryStyles.img}/> 
                  {/* <img src={x.photos} style={visible} className={categoryStyles.img}/>  */}
                {/* </div> */}
              
                <h2 className={categoryStyles.artTitle}>{x.title}</h2>
                <h6 className={categoryStyles.date}>{x.originalPost}</h6>
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
      <button onClick={handleClick} className={categoryStyles.moreBut}> MORE </button>
       </div> 
       

   </div>
      </main>
   </div>)
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URL}/categorizations`)

  const cats = await res.json();
  const paths = cats.map((x) => ({
    params: {  category: x.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.BACKEND_URL}/categorizations/${params.category}`)
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
  return { props: { topStory, header, category, subs: subs } }
}
