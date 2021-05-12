import Head from 'next/head';
import {useEffect, useState } from 'react';
import indexStyles from '../styles/Index.module.css';
import TopStories from '../components/TopStories.js';
import Advert from '../components/Advert.js';
import SecondaryStories from '../components/SecondaryStories.js';
import Breaking from '../components/Breaking.js';
export default function Home({articles, topStory, title}) {
   let [sortedArticles, setSortedArticles] = useState([]);
   let [breaking, setBreaking] = useState(false);
   let [breakingStory, setBreakingStory] = useState([])
    useEffect(() => {

      let output = [];
      let helper = [];
      let breaking = [];
      let one= { name: "Top Story", articles: [] , index: 0};
      let two = { name: "Local News", articles: [] , index: 1};
      let three = { name: "Sports", articles: [] , index: 2}; 
      let four = { name: "Opinion", articles: [], index: 3};
      let five = { name: "Community", articles: [], index: 4};
      let six = { name: "The Arts", articles: [], index: 5};
      
      articles.forEach(x =>{

      if (x.breaking == true) {
          let today = new Date()
         
         let published = new Date(x.created_at)         
         published.setHours(published.getHours() + 24);

        
         let now = new Date()
        let test = Date.parse(published) > Date.parse(now)
        // console.log(published, yesterday)
        if (test) {
          setBreaking(true)
          breaking.push(x)
      } else {
     
         
        }
      }
   
        switch (x.categorization_id) {
          case 1:

            one.articles.push(x)
          break;
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
      setBreakingStory(breaking)

        setSortedArticles([one, two, three, four, five, six]);
    }, [articles]);

  
  return (
    
    <div>
      <Head>
        <title>Wreck House Weekly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={indexStyles.mainContainer}>  
        {breaking ? (<Breaking breaking={breakingStory}/>) : (<div/>)}
        <div className={indexStyles.adHolder}>
          <TopStories title={title} topStory={topStory}/>
          <Advert/>
        </div>
      </main>
        <div className={indexStyles.center}> 
          <SecondaryStories sortedArticles={sortedArticles}/>
        </div>
    </div>
  )
}




export const getStaticProps = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/articles`)
  let topStoryStyleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
  const articles =  await res.json()
  let topStory = []
  let breaking = []
  let output = await articles.forEach((x, i) =>{
    if (topStory.length < 5) {
      if (x.breaking === true) {
          let nd = new Date(x.originalPost)
          let published = new Date(x.created_at)         
          published.setHours(published.getHours() - 5);
          let today = new Date()
          let yesterday = today.setHours(today.getHours() - 24);
        
        console.log(published, today)
    let test = Date.parse(today) > Date.parse(published)
        console.log(today > published)
        console.log(test)
        console.log(x.url)
          if (today > published) {
                x.style = topStoryStyleArray[0];
                topStory.push(x)
                topStoryStyleArray.shift()
          } else {
            breaking.push(x)

          }
      
      } else {
        x.style = topStoryStyleArray[0];
        topStory.push(x)
        topStoryStyleArray.shift()

      }
         
        } 
      }) 
  return {
    props: {
      articles,
      topStory
    }
  }
} 

