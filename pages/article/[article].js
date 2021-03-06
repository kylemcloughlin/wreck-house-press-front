import Head from 'next/head'
import Image from 'next/image'
import articleStyles from '../../styles/Article.module.css';
import {useState, useEffect } from 'react';
import axios from 'axios'
import { useAppContext } from '../../context/AppContext';
export default function Article({article}) {
  console.log(article)
    let [loggedIn, setLoggedIn] = useState(true)

 const handleLogin = async () => {
    axios.get(`${process.env.BACKEND_URL}/logged_in`, {
  

       withCredentials: true,
       headers: {
         'Content-Type': 'none'
       }
     })
     .then(res => {
       console.log("hitting", res.data.logged_in)
       setLoggedIn(res.data.logged_in);
     }).catch((error) => {
       console.log(error);
     });

 }
 useEffect(() => {


   handleLogin()
 }, []);

 let category = useAppContext().catagories;
//  console.log(article)
  return (
    <div>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<main className={articleStyles.container}>
  <h4 className={articleStyles.category}>{category[article.categorization_id - 1]}</h4> 
  <h1 className={articleStyles.title}>{article.title}</h1>
  <div className={articleStyles.headingHolder}>
    <h5 className={articleStyles.author}>by {article.author}</h5>
    <div className={articleStyles.underline}/>
  <div className={articleStyles.dateHolder}>
    <h5 className={articleStyles.date}>{article.originalPost}</h5>
    <div className={articleStyles.line}/>
    <h5 className={articleStyles.readTime}>6 min. read</h5>
  </div>
  </div>
  
  <div  className={articleStyles.imgHolder}>
  <img className={articleStyles.img} src={article.photos} alt="Picture of the author"/>
   <p className={articleStyles.subtitle}>{article.subtitles}</p>
  </div>
  <div>
     {loggedIn ? ( <div className={articleStyles.articleBody}> 
    {article.body.map((par, id) =>{
      return(
        <p  key={id} className={articleStyles.paragraph}>{par}</p>
      )
    })}
  </div>) : (<div className={articleStyles.articleBody}>
             <p>{article.body[0]} </p> 
                 <p className={articleStyles.para}>{article.body[2]}</p> 
             <div className={articleStyles.subscriptionWall}>  
               
             </div >
             </div>) }
    
    {/* <div className={articleStyles.articleBody}> 
    {article.body.map((par, id) =>{
      return(
        <p  key={id} className={articleStyles.paragraph}>{par}</p>
      )
    })}
  </div> */}

  </div>
</main>
    </div>
  )
}




export async function getStaticPaths() {

  
  const res = await fetch(`${process.env.BACKEND_URL}/articles`)

  const articles = await res.json();
  const paths = articles.map((x) => ({
    params: {
      article: x.id.toString()
    },
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  
  const res = await fetch(`${process.env.BACKEND_URL}/articles/${params.article}`)

  const article = await res.json()

  return {
    props: {
      article
    
    }
  }
}













