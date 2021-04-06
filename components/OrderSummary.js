
import styles from "../styles/Checkout.module.css";


const OrderSummary = ({option}) => {
  
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
                <p>${option.cost}.00</p>
              </div>
          <p> Today 's charge: ${option.cost}.00</p>
    </div>
  );
};

export default OrderSummary;