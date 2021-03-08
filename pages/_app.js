import Layout from '../components/Layout';
import { AppWrapper} from '../context/AppContext'; 
import { useAppContext  } from '../context/AppContext'; 
import {useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps, categorizes }) {
  let [category, setCategory] = useState("Top Story");
  const handleCategorizes = (x) => {
      setCategory(x);
  }
 

  
  return (
    <AppWrapper>
      <Layout category={handleCategorizes}>
        <Component {...pageProps} title={category}/>
      </Layout>
    {/* <div className='footer'></div> */}
    </AppWrapper>

)
}

export default MyApp
