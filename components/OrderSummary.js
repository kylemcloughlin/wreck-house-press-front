
import styles from "../styles/Checkout.module.css";


const OrderSummary = ({option}) => {
  
  return (
    <div className={styles.order}>
          <h2>Order Summary</h2>
          <div className={styles.divider}></div>
              <div className="order-item">
                <h3>Standard subscription</h3>
                <h4>{option.name}</h4>
                <h4>{option.dis}</h4>
              </div>
              <div className="order-item-price">
                <p>${option.cost}.00</p>
              </div>
          <hr></hr>
          <p> Today 's charge: ${option.cost}.00</p>
    </div>
  );
};

export default OrderSummary;