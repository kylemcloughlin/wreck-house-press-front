import Stripe from 'stripe';
import { parseCookies, setCookie} from 'nookies';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm'; 
const stripePromise = loadStripe("pk_test_51IUb2THPabCG8MNSBZ0jho7NuNfMretnRMbz8jlUfgLXSoTNAbY1zYuIL2OCmTobFFyru5aOtj6HX3LGKPQFz5vK00niljWpUb");
import { useRouter } from 'next/router';
import styles from '../../styles/Checkout.module.css';
import {React, useEffect, useState } from 'react';
import getConfig from 'next/config'
import CheckOutSignIn from '../../components/CheckOutSignIn';
const { serverRuntimeConfig} = getConfig()


export const getServerSideProps = async (ctx) => {
  let data = ctx
  data = data.params.checkout;
  const stripe = new Stripe(serverRuntimeConfig.mySecret)
  const {paymentIntentId} = await parseCookies(ctx);
  const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${data}`)
  const option = await res.json()
  let paymentIntent; 
  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    // console.log(paymentIntent)
    return  {
      props: {
        paymentIntent,
        option
      }
    }
  } else  {
    
    //  const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${data}`)
    //  const option = await res.json()
    console.log(option.cost)
   paymentIntent = await stripe.paymentIntents.create({
    amount: option.cost,
    currency: "CAD"
  })
  setCookie(ctx, 'paymentIntentId',paymentIntent.id)
  return {
    props: {
      paymentIntent,
      option
    }
  }
}

}

const CheckoutPage = ({paymentIntent, option}) => {
  let [signedIn, setSignedIn] = useState();    
  useEffect((ctx) => {
 
        const {Bearer} = parseCookies(ctx);
      
        if (Bearer) {
    
          setSignedIn(true)

        } else {
          setSignedIn(false)
        }
      
     

      
      },[]);
  



  return(  
  <div className={styles.mainContainer}>
  <div className={styles.holder}>
  <Elements stripe={stripePromise}>
   <div className={styles.panel}>
   { signedIn ? ( <div><h1>name : {option.name}</h1> <h1>cost : {option.cost}</h1></div> ) : (<CheckOutSignIn/>) }
   </div>
  <div className={styles.panel}>
    <CheckoutForm paymentIntent={paymentIntent}/>
  </div>
  </Elements>
  </div>
 </div> 
)
}


export default CheckoutPage