import Head from 'next/head';
import {useEffect, useState } from 'react';
import indexStyles from '../styles/Index.module.css';
import TopStories from '../components/TopStories.js';
import SecondaryStories from '../components/SecondaryStories.js';

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

    // console.log(sortedArticles);
  return (
    
    <div>
      <Head>
        <title>Wreck House Weekly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={indexStyles.mainContainer}>  
        <TopStories title={title} topStory={topStory}/>
        <a href="https://www.mcdonalds.com/ca/en-ca.html">< img className={indexStyles.ad} src="https://lh3.googleusercontent.com/5NejMBHTzveoshsGdyM0pLbQKl6aeF-AUtINDGh3h-LjZLAYhANSspl0f51BaxFcK60h31gxppVMvPqCSRi7B3Bu4pG5hlD-WDFF38MK0ebMtjBtralUM1Ha3iYAVQ3vhjs08MskW2z0zkLW_6rSA4Qwpmk9MuXsX7jvJ2mVCrjyXMsV-jgf1JdtfE6yK4BzzbK6pUCsbp9VhdYLrnO8ifIXhLu5m9w_SGbrRaphVMjkvK-St62BC0OoQsFlRTeW8C13tg06O-L_DdMZTvs9RF5ZGO67U8RX_blwzkVPFOIAazZyK1fgoFPRZVXLNSL8jCmLdNgt-ZOdO_f2pGJetzANqy17aFk32RNRXt2dtKvKowiYIwQEvn0dAtbPt8ZqjPHgYuanNIIc7uz6XiRi_Tz47xHgi5Obf6x5LjROOIIE2l-dGlkcb9cFfaOChIsgdEgBqByE8Jc_q1egSmc7rNtHEylpfJ8Bm9EMwoUgUZXLmuzg4UEy2oQzilOmXHvh5Cz7CS_WDucVsYEeA4yhT2c9EB7vI2RAEk4YqGc3ZZJRrlP3suMl-PMGErWxue8GbgcGv5mXU7-fqL4PByx5rkUfn05OT-nSRK9-zQXtS3gZW3wvH7BzJJhx0qxJ-zi-UE4thUWChiIeaEVYGmAo5aO9G356XoD2gqYYGHBW2jJyzynl1YX_xjGhFqkEUDVpXq6DvriKEITMTy4Jfl4FRnMt=w851-h315-no?authuser=0" /></a>
        <SecondaryStories sortedArticles={sortedArticles}/>
      </main>
    </div>
  )
}



export const getStaticProps = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/articles`)
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

