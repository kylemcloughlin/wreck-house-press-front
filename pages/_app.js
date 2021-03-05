import Layout from '../components/Layout';
import { AppWrapper} from '../context/AppContext'; 
import { useAppContext  } from '../context/AppContext'; 
import {useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps, categorizes }) {
  let [category, setCategory] = useState("Top Story");
  let [article, setArticle] = useState({});
  const handleCategorizes = (x) => {

      setCategory(x);
   

    

  }
  const handleArticle = (x) => {
    // setCategory(x);
    // console.log('hit', x)
    setArticle(x)

  }

  
  return (
    <AppWrapper>
      <Layout category={handleCategorizes}>
        <Component {...pageProps} title={category} handleArticle={handleArticle} data={article}/>
      </Layout>
    {/* <div className='footer'></div> */}
    </AppWrapper>

)
}

// export const getStaticProps = async () => {
//   const res = await fetch('http://localhost:3001/articles')
//   const articles =  await res.json()
//     console.log(articles)
//   return {
//     props: {
//       articles
//     }
//   }
// } 
// const handleClick = (e) => {
//   console.log('hit')
//   e.preventDefault()
//   let categorie = e.target.value;
//   console.log(categorie);
// }

export default MyApp
