import Stripe from 'stripe';
import { parseCookies, setCookie} from 'nookies';
import styles from '../../styles/Checkout.module.css';
import {React, useEffect, useState } from 'react';
import getConfig from 'next/config'
import CheckOutSignIn from '../../components/CheckOutSignIn';
// import "../styles/CheckoutForm.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import OrderSummary from "../../components/OrderSummary";

const { serverRuntimeConfig} = getConfig()


const CheckoutPage = ({option}) => {
  const stripePromise = loadStripe("pk_test_51IUb2THPabCG8MNSBZ0jho7NuNfMretnRMbz8jlUfgLXSoTNAbY1zYuIL2OCmTobFFyru5aOtj6HX3LGKPQFz5vK00niljWpUb");
  let [signedIn, setSignedIn] = useState();   
  let [bearer, setBearer ] = useState('')
  useEffect((ctx) => {
    
          const {Bearer} = parseCookies(ctx);
    
          if (Bearer) {
            setBearer(Bearer)
              setSignedIn(true)
      
            } else {
                setSignedIn(false)
              }
        
   },[])
        
    return (<div className={styles.mainContainer}>
    <div className={styles.holder}>
        <div className={styles.indexContainer}>
              <div className={styles.panel}>
              <OrderSummary option={option}/>
              </div>
              <div className={styles.panel}>
              <Elements stripe={stripePromise}>
           { signedIn ? ( <CheckoutForm code={option.stripe} bearer={bearer}/> ) : (<CheckOutSignIn/>) }
              </Elements>
              </div>
       </div>
        </div>
        </div>   
  );
};  


export default CheckoutPage;








      export const getServerSideProps = async (ctx) => {
        let data = ctx
        data = data.params.checkout;
      
        const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${data}`)
        const option = await res.json()
      
          
        return {
          props: {
            option
          }
        }
      
      
      }