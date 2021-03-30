import { parseCookies } from 'nookies';
import {React, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
    const router = useRouter();
  useEffect((ctx) => {
    const {Bearer} = parseCookies(ctx);
    if (!Bearer) {
      router.replace("/");
      console.log('hit')
    } 
      },[]);
  
  
  return ( <h1>settings</h1>)
}