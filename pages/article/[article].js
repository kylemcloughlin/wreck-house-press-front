import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import articleStyles from '../../styles/Article.module.css';
import {useState, useEffect } from 'react';
import axios from 'axios'
import { useAppContext } from '../../context/AppContext';
import { parseCookies} from 'nookies';
export default function Article({article}) {
    let [loggedIn, setLoggedIn] = useState(false);
    let [elmnt, setElmnt] = useState()


const subscriptionWall = () => {
  return (
        <div className={articleStyles.subscriptionWall}>  
               <Link  href="/">
               <button className={articleStyles.home}>HOME</button>
               </Link>
               <img src='/images/lock.png'/>
               <p className={articleStyles.dis}>Looks like you've registered but haven't subscribed yet</p>
               <p className={articleStyles.dis}>Subscribe to keep reading this article</p>
               <Link  href="/subscribe"><button className={articleStyles.button}>Subscribe</button></Link> 

             </div>
  )
}


const loggedInWall = () => {
  return (
        <div className={articleStyles.subscriptionWall}>  
               <Link  href="/">
               <button className={articleStyles.home}>HOME</button>
               </Link>
               <img src='/images/lock.png'/>
               <p className={articleStyles.dis}>Register and subscribe to keep reading this article</p>
                   <Link  href="/login"><button className={articleStyles.button}>REGISTER</button></Link>
               <p className={articleStyles.signIn}>Already Registered? <Link  href="/login"><a>Sign In</a></Link></p>
            
             </div>
  )
}

 const handleLogin = async (ctx) => {
const {Bearer} = await parseCookies(ctx);
    axios.get(`${process.env.BACKEND_URL}/logged_in`, {
         withCredentials: true,
         headers: {
           'Content-Type': 'none',
           "Authorization": Bearer
         }
       })
       .then(res => {
         if (res.data.logged_in) {
         let {legacy, sId, expiry} = res.data;
           let today = new Date()            
           let nd = new Date(expiry)
          
          

           if( expiry === 'annual') {
              setLoggedIn(res.data.logged_in);
           }
           else if (nd > today ) {
              setLoggedIn(res.data.logged_in);
            
             
            } else  {
              setLoggedIn(false);
              setElmnt(elementCondit(true))

            }
  
          
          
          } else {
                  setElmnt(elementCondit(false))
          }

       }).catch((error) => {
          setLoggedIn(false);
          setElmnt(elementCondit(false))

       });

   }

  const elementCondit = (elmnt) => {
    if (elmnt) {
      return(subscriptionWall())
    } else {
      return (loggedInWall())
    }
  }
 useEffect(() => {


   handleLogin()
 }, []);

 let category = useAppContext().catagories;
 let subcategory = useAppContext().subcatagories;

  return (
    <div className={articleStyles.holder}>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<main className={articleStyles.container}>
  <h4 className={articleStyles.category}>{category[article.categorization_id]}</h4> 
  { article.subcategorization_id === null ? (<div/>) : (<h4 className={articleStyles.subcategory}>{subcategory[article.subcategorization_id]}</h4> )}
  <h1 className={articleStyles.title}>{article.title}</h1>
  <div className={articleStyles.headingHolder}>
    <h5 className={articleStyles.author}>by {article.author}</h5>
    <div className={articleStyles.underline}/>
  <div className={articleStyles.dateHolder}>
    <h5 className={articleStyles.date}>{article.originalPost}</h5>
    <div className={articleStyles.line}/>
    <div  className={articleStyles.timeHolder}>
     <img className={articleStyles.clock} src="/images/clock-circular-outline.png"/>
     <h5 className={articleStyles.readTime}>6 min. read</h5>
    </div>
  </div>
  </div>
  
  <div  className={articleStyles.imgHolder}>
  
  <img className={articleStyles.img} src={article.fallback} alt="Picture of the author"></img>
  
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
                {elmnt}
         
         
             </div>) }

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
      article: x.url.toString()
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













