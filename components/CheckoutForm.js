import React, {useState, useEffect} from 'react';
import {destroyCookie} from 'nookies';
import styles from '../styles/Checkout.module.css';
import loaderStyles from '../styles/Loader.module.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import { symbol } from 'prop-types';

const CheckoutForm = props => {
  const [customerId, setCustomerId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [pending, setPending] = useState(false);
  const [mes, setMessage] = useState('')
 
  const stripe = useStripe();
  const elements = useElements();
  const springProps = useSpring({
  height: complete ? 250 : 0,
  width:  '100%',
  transform: 'translate3d(0,0,0)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  opacity: '.6',
  // transition: mes ? '' :'2ss ease',

  config: {
    duration: 400
  },

})
const springPropsTwo = useSpring({
  height:  mes ? 80 : 0,
  transform: 'translate3d(0,0,0)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  opacity: '.6',
  marginTop: '5em',
    
   
  // transition: mes ? '' :'2ss ease',

  config: {
    duration: 400
  },

})
  const handleSubmit = async (event) => {
    setPending(true)
    event.preventDefault()
   let {first,  last, email } = event.target
   let name = [first.value, last.value]
    name = name.join(" ")
    if (!stripe || !elements) {
      setPending(false)
      
      return;
    }
    
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email.value,
        
      },
    });
   
   
    if (result.error) {
      setPending(false)      
      // console.log(result.error.message); ///ADDD ERRROR HANDLEING HERE???
    } else {
      
      
      
      axios.post(`${process.env.BACKEND_URL}/customers`, {
        name: name,
        email: email.value,
        code: props.code,
        payment_method: result.paymentMethod.id,
        bearer: props.bearer
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const status = response.data.subscription.latest_invoice.status;
        const client_secret = response.data.subscription.latest_invoice.client_secret;

        setCustomerId(response.data.invoice_id)
        
        
        if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function (result) {
              if (result.error) {
                  
                  
                  
                  setPending(false)
                  // Display error message in your UI.
                  // The card was declined (i.e. insufficient funds, card has expired, etc)
                } else {
                  
                  setComplete(true)
                  //  setTimeout(function () { }, 2000);
                }
                });
              } else {
                  
                  setComplete(true)
                
                
             
               } 
  }).catch((error) => {
      if (error.response) {
        // Request made and server responded
        setMessage(error.response.data);
    
      } 
  
                setPending(false)

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
        color: "red"
      }
    }
  };

     function handleError() {
    setTimeout(function () { setMessage(false)}, 2000);
  }    
  useEffect(() => {
      
  if (mes) {
        handleError()

  }

  
  }, [mes]);
  if(complete) {

        return (
           <animated.div style={springProps} className={styles.sent}>
              <h5 className={styles.message}>Payment confrirmed!</h5>
              <span>your payment has been comfirmed, your invoice id is {customerId}</span>
              <span>your invoice will be sent to the email provided shortly </span>
             
             </animated.div> 
        )
      }
  

  return (
    <form className={styles.form} onSubmit={e => handleSubmit(e)}>
       <h5>Checkout Details</h5>
            

       <div className={styles.inputHolder}>     
      <label>First Name</label>
     <input label="first" name="first" type="text" placeholder="First" required />
      <label>Last Name</label>     
      <input label="last" name="last" type="textl"  placeholder="Last" required />
      </div>
      <div className={styles.addressDetails}>
      <label>Email</label>     
       <input className={styles.first} label="email" name="email" type="Email"  placeholder="Address" required />
 
      <label className={styles.creditCardLabel}>Credit Card Details
      </label>
        <CardElement options={cardOptions} className={styles.credit} />
             <animated.div style={springPropsTwo} className={styles.error}>
                <p>{mes}</p>
             </animated.div>

        </div>
{pending ? (<div className={loaderStyles.ldsRing}><div></div><div></div><div></div><div></div></div>): ( <button type="primary" htmlType="submit" className={styles.btn} disabled={!stripe}>Submit</button>)}
    </form>
  );
};
export default CheckoutForm