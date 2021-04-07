
import styles from "../styles/Checkout.module.css";


const OrderSummary = ({option}) => {
  let tax = 0;
  let cost =  option.cost
  if(option.cost === 60) {
    tax = 9;
    cost = cost + tax
    cost = cost + '.00'
    tax = tax + '.00'
    console.log(cost)
  }else {
    tax = .75
    cost = cost + tax

  }
  // if (option.cost) 
  return (
    <div className={styles.order}>
          <h2>Order Summary</h2>
          <div className={styles.divider}></div>
              <div className={styles.OrderSummary}>
                <h3>Standard subscription</h3>
                <h4 className={styles.head}>{option.name}</h4>
                <h4 className={styles.head}>{option.dis}</h4>
              </div>
              <div className="order-item-price">
                <p>Cost: ${option.cost}.00</p>
                <p>HST: ${tax}</p>
            <div className={styles.divider}></div>

              </div>
          <p> Today 's charge: ${cost}</p>
    </div>
  );
};

export default OrderSummary;