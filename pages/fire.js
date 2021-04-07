import {React, useState } from 'react';
// import { useRouter, Router } from 'next/router';
import axios from 'axios';
import styles from '../styles/Reset.module.css';



export default function fire() {
const [deployed, setDeployed]  = useState(false)

  const handleUser = () => {
    // setDeployed(true)
      axios.get(`${process.env.BACKEND_URL}/fire`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {

            if (response.status === 200) {

              setDeployed(true)
            }
        }).catch((error) => {
          console.log(error);
        })

      


  }
  if (deployed) {
    return( <div>
              <h3>deployed</h3>
            </div>)
    

  } 
  return( <div>
          
            <button onClick={handleUser}>FIRE</button>

         
          </div>)

}
