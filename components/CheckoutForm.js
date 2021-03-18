import React, {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {destroyCookie} from 'nookies';
import styles from '../styles/Checkout.module.css';
const CheckoutForm = ({paymentIntent}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [checkoutError, setCheckoutError] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState();

  const handleSubmit = async e => {
   e.preventDefault();
    try{
      const {
        error, 
        paymentIntent: {status}
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      if (error) {
          throw new Error(error.message);
      }
      if (status === 'succeeded') {
          destroyCookie(null,"paymentIntentId");
          setCheckoutSuccess(true)
      }
    } catch (err) {
      setCheckoutError(err.message);
      
    }
 }

 if(checkoutSuccess) return <p>Payment Successful!</p> ;
  return(<div>
     
    <form onSubmit={handleSubmit}>
    <div className={styles.name}>
    <label>First Name:</label>
    <input className={styles.first}/>
    <br/>
    <label>Last Name:</label>
    <input className={styles.last}/>
    </div>
    <label>Address</label>
    < input className={styles.address}/>
    <CardElement className={styles.credit}/>
      <button className={styles.btn} type="submit" disabled={!stripe}>send</button>
      {checkoutError && <span style={{color: 'red'}}>{checkoutError}</span>}
    </form>
  </div>
  )
}


export default CheckoutForm