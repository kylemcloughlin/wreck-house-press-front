import Head from 'next/head';
import {useEffect, useState } from 'react';;
import indexStyles from '../styles/Index.module.css';
import TopStories from '../components/TopStories.js';
import SecondaryStories from '../components/SecondaryStories.js'

export default function Home({articles, topStory, title}) {
   let [sortedArticles, setSortedArticles] = useState([]);
  
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

    console.log(sortedArticles);
  return (
    
    <div>
      <Head>
        <title>Wreck House Weekly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={indexStyles.mainContainer}>  
        <TopStories title={title} topStory={topStory}/>
        <SecondaryStories sortedArticles={sortedArticles}/>
      </main>
    </div>
  )
}



export const getStaticProps = async () => {
    const res = await fetch(`https://wreck-house-press-back.herokuapp.com/articles`)

  // const res = await fetch(`${process.env.BACKEND_URL}/articles`)
  let topStoryStyleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
  const articles =  await res.json()
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

