import Head from 'next/head'
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import {useEffect, useState } from 'react';
import {securedAxiosInstance, plainAxiosInstance } from '../assets/backend/axios.js'

export default function Category({title, handleArticle}) {
  let globalState = useAppContext();
  let [articles, setArticles] = useState([])
  const handleClick = (e) => {
    //  console.log(e.target.value)
    //  e.preventDefault()
    handleArticle(e)
    // console.log(e)
  }
const fetchData = async () => {
  let x ;

 globalState.catagories.forEach((el, ind) => {

  if (el === title) {
     x = ind + 1;
   }
 });

  await plainAxiosInstance.get(`/categorizations/${x}`)
    .then(res => {
      // console.log(res)
      // console.log(res.data)
      setArticles(res.data)
    })
    .catch(() => {
      console.log('err')
    })
    // .finally(() => {
    //   // setLoading(false);
    // });
};

useEffect(() => {
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
        <h1>
        {title}
        </h1>
          {articles.map((x)=> {
            return(
            <Link key={x.id} href="/article">
            <div value="xxx" onClick={handleClick.bind(this, x)} >
              <h1>{x.title}</h1>
            </div>
            </Link>
            )
          })}
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