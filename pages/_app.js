import Layout from '../components/Layout';
import { AppWrapper} from '../context/AppContext'; 
import { useAppContext  } from '../context/AppContext';
import axios from 'axios';
import {useState, useEffect } from 'react';
import '../styles/globals.css';
import { CookiesProvider } from "react-cookie"
import { parseCookies} from 'nookies';
import Link from 'next/link';
// import 'react-datepicker/dist/react-datepicker.css';
function MyApp({ Component, pageProps, categorizes, props }) {
  let [category, setCategory] = useState();
  let [loggedIn, setLoggedIn] = useState()
  let [admin, setAdmin] = useState(false);
  
  const  handleSignIn = () => {
    setLoggedIn(false)
    

  }
  const handleCategorizes = (x) => {
      setCategory(x);
  }
   const handleLogin = async (ctx) => {
   const {Bearer} = await parseCookies(ctx);
    axios.get(`${process.env.BACKEND_URL}/logged_in`, {
         withCredentials: true,
         headers: {
           'Content-Type': 'none',
           "Authorization": Bearer
         }
       })
       .then(res => {
         
         setAdmin(res.data.is)
        //  console.log(res.data)
         setLoggedIn(res.data.logged_in);

       }).catch((error) => {
         console.log(error);
       });

   }
   useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      // document.write("mobile device");


    } else {
      // false for not mobile device
      // document.write("not mobile device");
    }

     handleLogin()
   }, [loggedIn]);
  
  return (
    <AppWrapper>
      <Layout category={handleCategorizes}  loggedIn={loggedIn} handleSignIn={handleSignIn}>
      {admin ? (<div className="adminBar">
      <Link  href="/admin/breaking">
          <button className="breaking">BREAKING STORY</button>
      </Link>
      <Link  href="/admin/post">
          <button className="create">CREATE A STORY</button>
      </Link>
      < Link href="/admin/update">
          <button className="update">UPDATE A STORY</button>
      </Link>
      {/* <Link  href="/">
          <button className="create">ADD USER</button>
      </Link>
      < Link href="/">
          <button className="update">ADD PDF</button>
      </Link> */}
      
      </div>): (<div/>)}
        <Component {...pageProps} title={category}  handleSignIn={handleSignIn} loggedIn={loggedIn}/>
      </Layout>
    </AppWrapper>

)
}




export default MyApp
