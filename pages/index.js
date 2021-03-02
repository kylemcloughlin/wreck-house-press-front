import Head from 'next/head';
import {useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';


export default function Home({articles, title, handleArticle}) {
    let globalState = useAppContext().catagories;
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
          // console.log(articles[i]);
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
      
          {articles.map((x, ind)=> {
            // console.log(x)
             let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
            return(
              <Link key={x.id} href="/article">
            <div value="xxx" onClick={handleClick.bind(this, x)} className={x.style}>
               <img src={x.photos} style={visible} /> 
              <h5 className={indexStyles.catTitle}>{globalState[x.categorization_id]}</h5>
              
              <h2>{x.title}</h2>
              <h6>6 hour Ago</h6>
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
  console.log(`${process.env.BACKEND_URL}articles`);
  const res = await fetch(`${process.env.BACKEND_URL}articles`)
  let styleArray = [indexStyles.itemA, indexStyles.itemB, indexStyles.itemC, indexStyles.itemD, indexStyles.itemE];
  const articles =  await res.json()
  console.log(articles)
  let output = await articles.forEach((x, i) =>{
        x.style = styleArray[i];
  })

  return {
    props: {
      articles
    }
  }
} 

