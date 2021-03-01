import Head from 'next/head'
import Image from 'next/image'
import articleStyles from '../styles/Article.module.css';

export default function Article({title, data}) {
//  let state = useAppContext();
//  console.log(test)
  // console.log(state);
  console.log(data)
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
         <h2 className={articleStyles.category}> { title } </h2>
      <main >
        <h1 className={articleStyles.title}>
          {data.title}
        </h1>
         <h2 className={articleStyles.subtitle}>
          {data.subtitles}
        </h2>
        <h5 className={articleStyles.author}>by {data.author}</h5>
        {/* <h5>by {data.photos}</h5> */}
       <div     className={articleStyles.imgHolder}>

         <img
        className={articleStyles.img}
        src={data.photos}
        alt="Picture of the author"
        // layout="fill"
        // width={500}
        // height={500}
        />
        </div>

        <div>
          <p className={articleStyles.articleBody}>
            {data.body}
          </p>
        </div>
      </main>
    </div>
  )
}
