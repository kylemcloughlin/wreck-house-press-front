import Head from 'next/head';
import Link from 'next/link';
import {useRouter } from 'next/router'
import categoryStyles from '../styles/Category.module.css';




export default function Category({ category}) {
  let header = category.header
  let articles  = category.articles
  let shallow = [];
  let styleArray = [categoryStyles.itemA, categoryStyles.itemB, categoryStyles.itemC, categoryStyles.itemD, categoryStyles.itemE]
  return (
    <div className={categoryStyles.mainContainer}>
      <Head>
        <title>{header}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={categoryStyles.indexContainer}>
          <h1 className={categoryStyles.title}> {header}</h1>
          <div className={categoryStyles.underline}/>
          <div className={categoryStyles.storiesContainer}>
            {articles.map((x, ind)=> {
              let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
              return(
                 <Link key={x.id} href="article/[article]" as={`/article/${x.id}`}> 
                <div className={styleArray[ind]}>
                  <h5 className={categoryStyles.catTitle}>{header}</h5>
              
                    <img src={x.photos} style={visible}  className={categoryStyles.img}/> 
                {/* <div className={categoryStyles.imgHolder}> */}
                  {/* <img src={x.photos} style={visible} className={categoryStyles.img}/>  */}
                {/* </div> */}
              
                <h2 className={categoryStyles.artTitle}>{x.title}</h2>
                <h6 className={categoryStyles.date}>{x.originalPost}</h6>
                <div/>
                </div>
                </Link>
      )
    })}
        </div>
       </div> 
       

      </main>
   </div>)
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.BACKEND_URL}/categorizations`)

  const cats = await res.json();
  const paths = cats.map((x) => ({
    params: {  category: x.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.BACKEND_URL}/categorizations/${params.category}`)
  const category = await res.json()

  return { props: { category } }
}
