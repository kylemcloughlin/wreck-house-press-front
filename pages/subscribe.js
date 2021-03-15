import styles from '../styles/Subscribe.module.css';
import Link from 'next/link';

export default function Subscribe({options}) {
 
  const handleClick = (opt, e) => {
      // console.log(e)
      console.log(opt.id)
    }
  return (    <div className={styles.mainContainer}>
            <h1>Subscribe</h1>
  <div className={styles.holder}>
            {options.map((opt) =>{
              return (<div key={opt.name} key={opt.id} className={styles.option} > 
                <h1>{opt.name}</h1>
                <Link  href="/checkout/[checkout]" as={`/checkout/${opt.id}`}>
                  {/* <Link href="checkout/[checkout]" as={`/checkout/${opt.id}`}>  */}
                <button onClick={handleClick.bind(this, opt)} value={opt.cost}> {opt.name} </button>
                  </Link> 
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
