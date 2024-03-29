
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';
import { useAppContext  } from '../context/AppContext';

const three =({x}) => {
  let subs = useAppContext().subcatagories;
 const countDown = (x) => {
  let input = null
  if (x.legacy === 't') {
    input = x.originalPost
  } else {
    input = x.publish_time
  }
  let date1 = new Date(input);
    let date2 = new Date(); // 9:00 AM
    let diff = date2 - date1;
    let msec = diff;
    let ss = Math.floor(msec / 1000);
    let mm = Math.floor(msec / 1000 / 60);
    let hh = Math.floor(msec / 1000 / 60 / 60);
    let days = Math.floor(hh / 24)
    let years = Math.floor(days / 365)
    // let year  = 
   
      if (years > 1) {
        return `posted ${years} years ago`;
      } else if (years === 1) {
        return `posted ${years} year ago`;
      } else if (days > 1) {
        return `posted ${days} days ago`;

      } else if (days === 1) {
        return `posted ${days} day ago`;

      } else if (hh > 1) {
        return `posted ${hh} hours ago`;

      } else if (hh === 1) {
        return `posted ${hh} hour ago`;

      } else if (mm > 1) {
        return `posted ${mm} minutes ago`;

      } else if (mm === 1) {
        return `posted ${mm} minute ago`;

      } else {
        return `posted ${ss} seconds ago`;

      }
     }
  let lowerDiv = [indexStyles.subItemA, indexStyles.subItemB, indexStyles.subItemC]
  let three = [x.articles[0], x.articles[1], x.articles[2]];
  
  return (
       <div  className={indexStyles.subStoryCont}>
         {three.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.url}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={indexStyles.threeCatTitle}>{x.name}</h5>
                <h5 className={indexStyles.threeSubCatTitle}>{subs[art.subcategorization_id]}</h5>                
                <img className={indexStyles.threeImg} src={art.fallback[0]}/>
                <h3 className={indexStyles.threeHeader}>{art.title}</h3>
                <h6 className={indexStyles.threeTimeFooter}>{countDown(art)}</h6>    
                <div/>     
              </div>
             </Link>
             ) })}             
         </div>
          )
}

export default three