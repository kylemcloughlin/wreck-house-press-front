import React, {useState} from 'react';
import {destroyCookie} from 'nookies';
import styles from '../styles/Checkout.module.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Input, Col, Row, Form, Button, Modal } from "antd";
import Router from "next/router";
import axios from 'axios';

const CheckoutForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  let email = 'test@testy.com';

  const handleSubmit = async (event) => {
    event.preventDefault()
    let name = event.target.name.value
    let email = event.target.email.value
    let add = event.target.address.value
    let postal = event.target.postal.value
    let city = event.target.city.value
    let prov = event.target.province.value
    let country = event.target.country.value
    let address = `${add} ${postal} ${city}, ${prov} ${country}`;
    console.log(address)
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
      setComplete('pending')
      
      
      axios.post(`${process.env.BACKEND_URL}/customers`, {
        email: email,
        payment_method: result.paymentMethod.id,
        code: props.code,
        name: name,
        address: address,
        
      }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
      const status = response.data.subscription.latest_invoice.status;
      const client_secret = response.data.subscription.latest_invoice.client_secret;
    
      if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                  console.log('There was an issue!');
                  console.log(result.error);
                  // Display error message in your UI.
                  // The card was declined (i.e. insufficient funds, card has expired, etc)
                } else {
                    console.log('You got the money!');
                  setComplete(true)
                  }
                });
              } else {
                  console.log('You got the money!');
                  setComplete(true)
                
             
               } 
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

  if(complete) {
    return( 
      <div>
       <h5>Checkouted</h5>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={e => handleSubmit(e)}>
       <h5>Checkout Details</h5>
       <div className={styles.inputHolder}>     
      <label>Full Name</label>
     <input label="Name" name="name" type="text" placeholder="Name" required />
      <label>Email</label>     
      <input label="Email" name="email" type="email"  placeholder="Email" required />
      </div>
      <div className={styles.addressDetails}>
      <label>Address</label>     
       <input className={styles.first} label="Address" name="address" type="text"  placeholder="Address" required />
       <div className={styles.inputHolder}>
      <label>Postal Code</label>          
        <input label="Postal Code" name="postal" type="text" placeholder="Postal Code" required />
      <label>City</label>           
        <input label="City" name="city" type="text"  placeholder="City" required />
      </div>
       
       <div className={styles.inputHolder}>
        <label>Province</label>           
        <input className={styles.province} label="Province" name="province" type="text"  placeholder="Province" required />
        <label>Country</label>                 
        <input className={styles.country} label="Country" name="country" type="text"  placeholder="Country" required />
       </div>
       <label className={styles.creditCardLabel}>Credit Card Details</label>
        <CardElement options={cardOptions} className={styles.credit}/>
        </div>
{complete === 'pending' ? (<button className={styles.btn} disabled={true}>Sent</button>): ( <button type="primary" htmlType="submit" className={styles.btn} disabled={!stripe}>Submit</button>)}
    </form>
  );
};
export default CheckoutForm