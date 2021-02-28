import Head from 'next/head'
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';

export default function Home({articles, title, handleArticle}) {
    const handleClick = (e) => {
    //  console.log(e.target.value)
    //  e.preventDefault()
     handleArticle(e)
      // console.log(e)
    }
    // console.log(articles)
  return (
    <div>
      <Head>
        <title>Wreck House Weekly</title>
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

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/articles')
  const articles =  await res.json()
  // console.log(articles)
  return {
    props: {
      articles
    }
  }
} 

