import Head from 'next/head';
import Link from 'next/link';
import {useRouter } from 'next/router'
import categoryStyles from '../styles/Category.module.css';
import {useState } from 'react';
import AddStory from '../components/AddStory.js';



export default function Category({ topStory, header, category}) {
  console.log(category.length)
  let [moreStories, setMoreStories] = useState([]);
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  const handleClick = (e) => {
   let holder =  category.splice(0, 3)
   console.log(holder)
  let holderTwo = {
    Stories: holder
  }
  setMoreStories([...moreStories, holder])
  }
  return (
    <div className={categoryStyles.mainContainer}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
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
                {/* <div className={categoryStyles.imgHolder}> */}
                  {/* <img src={x.photos} style={visible} className={categoryStyles.img}/>  */}
                {/* </div> */}
              
                <h2 className={categoryStyles.artTitle}>{x.title}</h2>
                <h6 className={categoryStyles.date}>{x.originalPost}</h6>
                <div/>
                </div>
                </Link>
      )
    })}
        </div>
      {moreStories.map((x, ind)=> {
        return(<AddStory key={ind} newStories={x}/>)
      })}
      <button onClick={handleClick}> MORE </button>
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
  let category = [];
  let topStory = []
  let holder = await output.articles.forEach((x, i) => {
    if (topStory.length < 5) {
      topStory.push(x)

    } else {
      category.push(x)
    }
  })
  return { props: { topStory, header, category } }
}
