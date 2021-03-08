import Head from 'next/head';
import {useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';


export default function Home({articles, topStory, title, handleArticle}) {
    let globalState = useAppContext().catagories;
   let shallow = [];
   let [sortedArticles, setSortedArticles] = useState([])
   let styleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
  let lowerDiv = [indexStyles.subItemA, indexStyles.subItemB, indexStyles.subItemC]
   const handleClick = (e) => {
     handleArticle(e)
  
    }
    useEffect(() => {

      let output = [];
      let helper = [];
     
      let two = { name: "Local News", articles: [] };
      let three = { name: "Sports", articles: [] }; 
      let four = { name: "Opinion", articles: [] };
      let five = { name: "Community", articles: [] };
      let six = { name: "The Arts", articles: [] };

      articles.forEach(x =>{
        switch (x.categorization_id) {
          case 2:
          
            two.articles.push(x)
          break;
          case 3:
            three.articles.push(x)

          break;
          case 4:
            four.articles.push(x)

          break;
          case 5:
            five.articles.push(x)

          break;
          case 6:
            six.articles.push(x)
       
          break;
          default:
          // code block
        }
        
      })
        setSortedArticles([two, three, four, five, six]);
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
          {topStory.map((x, ind)=> {
             let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
            return(
              <Link key={x.id} href="article/[article]" as={`/article/${x.id}`}> 
            <div value="xxx" onClick={handleClick.bind(this, x)} className={x.style}>
               <img src={x.photos} style={visible} /> 
              <h5 className={indexStyles.catTitle}>{globalState[x.categorization_id - 1]}</h5>
                  <h2 className={indexStyles.header}>{x.title}</h2>
              <h6 className={indexStyles.timeFooter}>6 hour Ago</h6>
            </div>
            </Link>)
          })}
        </div>
      </div>
      
      
       <div>
         {sortedArticles.map((x, ind) => {
            
            let three = [articles[0], articles[1], articles[2]];
            console.log(three)
            let url = ind + 1
            return(
            <div key={ind} className={indexStyles.subStoryDiv}>
             <h1>{x.name}</h1>
              <Link key={x.id} href="[category]" as={`/${url.toString()}`}>           
              <img src="/images/arrow.png" className={indexStyles.arrow}/>
              </Link>
              <div className={indexStyles.underline}/>   
              <div  className={indexStyles.subStoryCont}>
          
                  {three.map((art, ind) =>{
                      return(  
                     <Link key={x.id} href="article/[article]" as={`/article/${art.id}`}> 
                     <div className={lowerDiv[ind]}>
                            <h5 className={indexStyles.catTitle}>{globalState[art.categorization_id - 1]}</h5>
                  <h3 className={indexStyles.header}>{art.title}</h3>
              <h6 className={indexStyles.timeFooter}>6 hour Ago</h6>
                           </div>
                          </Link>
                          )
                  })}
             
              
             
              </div>
              </div>
      
              )})}
       </div>
     
     
      </main>
    </div>
  )
}



export const getStaticProps = async () => {

  const res = await fetch(`${process.env.BACKEND_URL}articles`, {
    method: 'GET',
    headers: {
      'User-Agent': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

  })
  let topStoryStyleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
 
  const articles =  await res.json()
  console.log(articles)

  let topStory = []

  let output = await articles.forEach((x, i) =>{
    if (topStory.length < 5) {
      x.style = topStoryStyleArray[i];
          topStory.push(x)
         
        } 
      })
      
  return {
    props: {
      articles,
      topStory
    }
  }
} 

