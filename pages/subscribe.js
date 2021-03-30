import styles from '../styles/Subscribe.module.css';
import Link from 'next/link';

export default function Subscribe({options}) {
 
  const handleClick = (opt, e) => {
      // console.log(e)
      console.log(opt)
    }
  return (    <div className={styles.mainContainer}>
            <div className={styles.titleHolder}>
              <h1>Subscribe</h1>
              <h3>Choose your pricing plan</h3>
            </div>
            <div className={styles.holder}>
            {options.map((opt) =>{
              return (<div key={opt.name} key={opt.id} className={styles.option} > 
                <h1>{opt.name}</h1>
                <p>{opt.dis}</p>
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
