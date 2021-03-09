import Head from 'next/head'
import Image from 'next/image'
import articleStyles from '../../styles/Article.module.css';
import { useAppContext } from '../../context/AppContext';
export default function Article({article}) {

  console.log(article)
 let category = useAppContext().catagories;
 console.log(article)
  return (
    <div>
      <Head>
        <title>{article.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<main >
  <h4>{category[article.categorization_id - 1]}</h4> 
  <h1 className={articleStyles.title}>{article.title}</h1>
  <h5 className={articleStyles.author}>by {article.author}</h5>
  <div  className={articleStyles.imgHolder}>
  <img className={articleStyles.img} src={article.photos} alt="Picture of the author"/>
   <span className={articleStyles.subtitle}>{article.subtitles}</span>
  </div>
  <div>
    <div className={articleStyles.articleBody}> 
    {article.body.map((par, id) =>{
      return(
        <p  key={id} className={articleStyles.paragraph}>{par}</p>
      )
    })}
  </div>
  </div>
</main>
    </div>
  )
}




export async function getStaticPaths() {
  const res = await fetch(`https://wreck-house-press-back.herokuapp.com/articles`)
  // const res = await fetch(`${process.env.BACKEND_URL}/articles`)

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

export async function getStaticProps({
  params
}) {
  const res = await fetch(`https://wreck-house-press-back.herokuapp.com/articles/${params.article}`)
  // const res = await fetch(`${process.env.BACKEND_URL}/articles/${params.article}`)

  const article = await res.json()

  return {
    props: {
      article
    }
  }
}













