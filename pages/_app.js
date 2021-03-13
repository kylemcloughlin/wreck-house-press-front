import Layout from '../components/Layout';
import { AppWrapper} from '../context/AppContext'; 
import { useAppContext  } from '../context/AppContext';
import axios from 'axios';
import {useState, useEffect } from 'react';
import '../styles/globals.css';
import { CookiesProvider } from "react-cookie"
function MyApp({ Component, pageProps, categorizes, props }) {
  let [category, setCategory] = useState("Top Story");
    let [loggedIn, setLoggedIn] = useState("")

  
  const handleCategorizes = (x) => {
      setCategory(x);
  }
   const handleLogin = async () => {
let hold = document.cookie
hold = hold.split("=")
console.log(hold, "??????")
    axios.get(`${process.env.BACKEND_URL}/logged_in`, {
         withCredentials: true,
         headers: {
           'Content-Type': 'none',
           "Authorization": hold[1]
         }
       })
       .then(res => {
         console.log(res)
         setLoggedIn(res.data.logged_in);
       }).catch((error) => {
         console.log(error);
       });

   }
   useEffect(() => {
    

     handleLogin()
   },[]);
  
  return (
    <AppWrapper>
      <Layout category={handleCategorizes} updateLogin={handleLogin} loggedIn={loggedIn}>
        <Component {...pageProps} title={category} handleLogin={handleLogin} loggedIn={loggedIn}/>
      </Layout>
    </AppWrapper>

)
}




export default MyApp
