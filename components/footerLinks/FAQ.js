
import {React, useState, useEffect} from 'react';
import styles from '../../styles/FooterLinks.module.css';
import Question from './Question.js';
let dat = [{
  question: "What are your newspapeer print edition rates?",
  answers: ["Weekly home delivery is $1.90, which includes HST.", "The price on news stands for each edition is $1.95 plus HST.", "Mailed copies are $1.90 plus $2.25 postage = $4.15 per week.", "Subscriptions may be prepaid for 3, 6 or 12 months via e-transfer, cheque or cash to your carrier. If you choose to pay your carrier directly, please adhere to COVID-19 protocols for masks, hand sanitizing and social distancing.", "Call us at 695-2389 to arrange your subscription."]
}, {
  question: "Why do i have to pay to see your news articles?",
  answers: ["Because running a website isn't free. Because just gathering news in the first place isn't free (think gas or phone bills). Because staff have to be paid. Because we aren't millionaire philanthropists, as much as we'd like to be."]
}, {
  question: "Are you currently accepting submissions?",
  answers: ["Freelance writers for Wreckhouse Weekly are always welcome. Please send a short email outlining what you would like to write about to info@wreckhousepress.com.", "As for book manuscripts, not yet.", "While we hope to grow Wreckhouse Press to include more authors, at present we are still focused on getting the newspaper humming along smoothly. Once this changes, we will post an update."]
}, {
  question: "What is the best way to reach you for media inquires?",
  answers: ["The fastest route is probably Twitter, where our staff writer usually lurks while writing. Otherwise try Facebook or email."]
}, {
  question: "i have a question not listed here?",
  answers: ["contact us here"]
}]



const  FAQ= () => {
 const [toggle, setToggle] = useState(false);

 const handleToggle = (e) => {

   setToggle(!toggle)
 }
  return (
      <main className={styles.FAQmain}>
       <h1 className={styles.title}>Frequently asked questions</h1>
        <div>
        {dat.map(data => {
          return(
           <Question data={data}/>
          )
        })}
        </div>
      </main>
  )
}


export default FAQ