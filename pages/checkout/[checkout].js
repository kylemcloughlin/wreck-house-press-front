import Stripe from 'stripe';
// import { parseCookies, setCookie} from 'nookies';
import styles from '../../styles/Checkout.module.css';
import {React, useEffect, useState } from 'react';
import getConfig from 'next/config'
// import CheckOutSignIn from '../../components/CheckOutSignIn';
// import "../styles/CheckoutForm.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import OrderSummary from "../../components/OrderSummary";
import { Col, Row } from "antd";
const { serverRuntimeConfig} = getConfig()


const CheckoutPage = () => {
  const stripePromise = loadStripe(
    "pk_test_51IUb2THPabCG8MNSBZ0jho7NuNfMretnRMbz8jlUfgLXSoTNAbY1zYuIL2OCmTobFFyru5aOtj6HX3LGKPQFz5vK00niljWpUb"
    );  
    return (
      <Row>
      <Col offset={6} span={12} className="stripe-form-container">
        <div className="stripe-form">
          <Row gutter={12}>
            <Col span={14}>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Col>
            <Col span={10}>
              <OrderSummary />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>    
  );
};  


export default CheckoutPage;






// { signedIn ? ( <div><h1>name : {option.name}</h1> <h1>cost : {option.cost}</h1></div> ) : (<CheckOutSignIn/>) }


// let [signedIn, setSignedIn] = useState();    
// useEffect((ctx) => {
  
  //       const {Bearer} = parseCookies(ctx);
  
  //       if (Bearer) {
    
    //         setSignedIn(true)
    
    //       } else {
      //         setSignedIn(false)
      //       }
      
      
      
      // export const getServerSideProps = async (ctx) => {
      //   let data = ctx
      //   data = data.params.checkout;
      
      //   const res = await fetch(`${process.env.BACKEND_URL}/subscriptions/${data}`)
      //   const option = await res.json()
      
          
      //   return {
      //     props: {
      //       option
      //     }
      //   }
      
      
      // }