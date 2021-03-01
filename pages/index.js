import Head from 'next/head';
import {useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';


export default function Home({articles, title, handleArticle}) {
   let shallow = [];
  //  let [artic, setArticles] = useState([])
   let styleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
  const handleClick = (e) => {
     handleArticle(e)
  
    }
    useEffect(() => {
        for (let i = 0; i < articles.length; i++) {

          // if (shallow.length < 5) {
            let item = articles[i];
            item.style = styleArray[i];
          //   // console.log(styleArray[i])
            shallow.push(item);
          // } else {

          // }
          console.log(articles[i]);
        }
    }, []);
  return (
    <div>
      <Head>
        <title>Wreck House Weekly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={indexStyles.mainContainer}>
      <div className={indexStyles.indexContainer}>
        <h1 className={indexStyles.title}>  {title}</h1>
        <div className={indexStyles.underline}/>   
       
       
        <div className={indexStyles.storiesContainer}>
      
          {articles.map((x)=> {
            return(
              <Link key={x.id} href="/article">
            <div value="xxx" onClick={handleClick.bind(this, x)} className={x.style}>
              <h1>{x.title}</h1>
            </div>
            </Link>)
          })}
        </div>
       
      </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/articles')
  let styleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
  const articles =  await res.json()
  let output = await articles.forEach((x, i) =>{
        x.style = styleArray[i];
  })


  // for (let i = 0; i < articles.length; i++) {

  //   // if (shallow.length < 5) {
  //   let item = articles[i];
  //   item.style = styleArray[i];
  //   //   // console.log(styleArray[i])
  //   shallow.push(item);
  //   // } else {

  //   // }
  //   console.log(articles[i]);
  // }
  return {
    props: {
      articles
    }
  }
} 

