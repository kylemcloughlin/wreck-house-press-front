import Head from 'next/head'
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import {useEffect, useState } from 'react';
import {securedAxiosInstance, plainAxiosInstance } from '../assets/backend/axios.js';
import categoryStyles from '../styles/Category.module.css';

export default function Category({title, handleArticle}) {
  let globalState = useAppContext().catagories;
  let [articles, setArticles] = useState([])
  let shallow = [];
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  const handleClick = (e) => {
    //  console.log(e.target.value)
    //  e.preventDefault()
    handleArticle(e)
    // console.log(e)
  }
const fetchData = async () => {
  let x ;

 globalState.forEach((el, ind) => {

  if (el === title) {
     x = ind + 1;
   }
 });

  await plainAxiosInstance.get(`/categorizations/${x}`)
    .then(res => {
    //  console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {
        
        if (shallow.length < 5) {
          let item = res.data[i];
          item.style = styleArray[i];
          // console.log(styleArray[i])
          shallow.push(res.data[i]);
        } else {
          
        }
        // console.log(i);
      }
      
      setArticles(shallow);

    })
    .catch(() => {
      console.log('err')
    })

};

useEffect(() => {
  console.log("hellllllo");
  // console.log("!!!!!!", process.env.ROOT_URL);
  fetchData();
}, [title]);
  // console.log(articles)
  return (
    <div>
      <Head>
        <title>{title}</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
       



  <div className={categoryStyles.indexContainer}>

        <h1 className={categoryStyles.title}>
        {title}
        </h1>
        <div className={categoryStyles.underline}/>
      
      <div className={categoryStyles.storiesContainer}>
          {articles.map((x, ind)=> {
           let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
           console.log(visible)
            return(
            <Link key={x.id} href="/article"> 
                <div value="xxx" onClick={handleClick.bind(this, x)} className={x.style}>
           <div>
              <img src={x.photos} style={visible} className={categoryStyles.img}/> 
                <h5 className={categoryStyles.catTitle}>{globalState[x.categorization_id]}</h5>
           </div>
              <h2 className={categoryStyles.artTitle}>{x.title}</h2>
            {/* <h4 style={visible}>{x.subtitles}</h4> */}
                <h6 className={categoryStyles.date}>20 hrs ago</h6>
             </div>
            </Link>
            )
          })}
      </div>


    </div>

      </main>
    </div>
  )
}


// export const getStaticProps = async ({title}) => {
//   let x = 0;
//   console.log('inprops', title)
//   if (title === 'sports') {
//     x = 1
//   } else if(title === 'politics') {
//     x = 2
//   }
//   else {
//     x = 3
//   }
//   const res = await fetch(`http://localhost:3001/categorizations/${x}`)
//     // console.log(res.json())
//   const articles =  await res.json()
//   console.log("thfer", articles)
//   return {
//     props: {
//       articles
//     }
//   }
// } 