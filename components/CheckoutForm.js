import React, {useState} from 'react';
import {destroyCookie} from 'nookies';
import styles from '../styles/Checkout.module.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Input, Col, Row, Form, Button, Modal } from "antd";
import Router from "next/router";
import axios from 'axios';

const CheckoutForm = props => {
  // const { getFieldDecorator } = props.form;
  const [isLoading, setLoading] = useState(false);
  console.log(props)
  const stripe = useStripe();
  const elements = useElements();
  let email = 'test@testy.com';

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('hit')
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
    console.log('hit firtst if')

      return;
    }
    console.log('hit 3', stripe)
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });
      console.log(result)
      console.log('hit 4')
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log('hit 5')

 
      axios.post(`${process.env.BACKEND_URL}/customers`, {
        email: email,
        payment_method: result.paymentMethod.id,
         
         
  }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    console.log(response.data)
        const status = response.data.subscription.latest_invoice.status
      const client_secret = response.data.subscription.latest_invoice.client_secret
      console.log(client_secret)
      console.log(status)

    // eslint-disable-next-line camelcase
    
      if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                  console.log('There was an issue!');
                  console.log(result.error);
                  // Display error message in your UI.
                  // The card was declined (i.e. insufficient funds, card has expired, etc)
                } else {
                    console.log('You got the money!');
                    // Show a success message to your customer
                  }
                });
              } else {
                  console.log('You got the money!');
              //     // No additional information was needed
             
               } //     // Show a success message to your customer
  }).catch((error) => {
    console.log(error);
  });
      }
    
  };
   

  const cardOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: 500,
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#bfbfbf" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };
  return (
    <form onSubmit={e => handleSubmit(e)}>
     
     <CardElement options={cardOptions} />

      <button
        // loading={isLoading}
        type="primary"
        htmlType="submit"
        className="checkout-button"
        disabled={!stripe}>Submit</button>
    </form>
  );
};
export default CheckoutForm