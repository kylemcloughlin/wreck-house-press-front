import styles from '../styles/Subscribe.module.css';
import Link from 'next/link';
import {useState} from 'react';
import loaderStyles from '../styles/Loader.module.css';
export default function Subscribe({options}) {
  const [pending, setPending] =  useState(false)
//  {pending ? (<div className={loaderStyles.ldsRing} style={{bottom: '0em', left: '45%'}}><div></div><div></div><div></div><div></div></div>): ( <button  type="submit" className={styles.emailButton}>SEND</button>)}
  const handleClick = (opt, e) => {
    setPending(true)
 
    }


    if(pending) {
  return ( <div className={styles.mainContainer}>
                <div className={loaderStyles.ldsRing} style={{bottom: '0em', left: '45%'}}><div></div><div></div><div></div><div></div></div>
              </div>)
    }
  return (    <div className={styles.mainContainer}>
            <div className={styles.titleHolder}>
              <h1>Subscribe</h1>
              <h3>Choose your pricing plan</h3>
            </div>
            <div className={styles.holder}>
            {options.map((opt) =>{
              return (<div key={opt.name} key={opt.id} className={styles.option} > 
                <h1 className={styles.subscriptionTitle}>{opt.name}</h1>
                <p className={styles.dis}>{opt.dis}</p>
                 <p className={styles.valid}>{opt.validUntil}</p>
                {/* <h5>{opt.validUntil}</h5> */}
                <Link  href="/checkout/[checkout]" as={`/checkout/${opt.id}`}>
                  {/* <Link href="checkout/[checkout]" as={`/checkout/${opt.id}`}>  */}
                <button onClick={handleClick.bind(this, opt)} value={opt.cost} className={styles.btn}> ${opt.cost}.00 </button>
                  </Link> 
                  <p className={styles.includes}>{opt.includes}</p>
                  <p className={styles.foot}>{opt.foot}</p>

              </div>)
            })}


            </div>
          </div>)
}


export const getStaticProps = async () => {


  const res = await fetch(`${process.env.BACKEND_URL}/subscriptions`)
  const options = await res.json()
  return {
    props: {
      options
    }
  }
}
