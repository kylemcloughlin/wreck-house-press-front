import { parseCookies } from 'nookies';
import {React, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Breaking() {
  const router = useRouter();
  useEffect((ctx) => {
    const {Bearer} = parseCookies(ctx);
    if (!Bearer) {
      // router.replace("/");
      console.log('hit')
    } 
      },[]);
  
      const handleBreaking = (e) => {
        e.preventDefault()
        let {title, author, readTime, category, subcategory, photos, subtitles, body} = e.target;
        console.log(`${title.value} ${author.value} ${readTime.value} ${category.title} ${subcategory.value} ${photos.value} ${subtitles.value} ${body.value}`)
    
      }

  return (
      <div>
          <form onSubmit={handleBreaking}>
          <ul>
        <li>
          <input name="title" type="text"   placeholder="Title" required />
        </li>
         <li>
          <input name="author" type="text"   placeholder="Authors" required />
         </li>        
         <li>
          <input name="readTime" type="text"   placeholder="Read Time" required />
        </li>
         <li>
          <input name="category" type="text"   placeholder="Category" required />
        </li>
        <li>
          <input name="subcategory" type="text"   placeholder="Subcategory" required />
        </li>
         <li>
          <input name="photos" type="text"   placeholder="photos" required />
        </li>
        <li>
          <input name="subtitles" type="text"   placeholder="subtitles" required />
        </li>
        <li>
         <textarea name='body'  placeholder="Email Body " required />
        </li>
      </ul>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
      </div>
  )
}