import Link from 'next/link';
import sixStyles from '../styles/Six.module.css';
import { useAppContext  } from '../context/AppContext';

const Six = ({x}) => {
  const subs = useAppContext().subcatagories;
 const countDown = (x) => {
  let input = null
  if (x.legacy === 't') {
    input = x.originalPost
  } else {
    input = x.created_at
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

   if (years > 0) {
     return `posted ${years} years ago`;
   } else if (days > 0) {
     return `posted ${days} days ago`;

   } else if (hh > 0) {
     return `posted ${hh} hours ago`;

   } else if (mm > 0) {
     return `posted ${mm} minutes ago`;

   } else {
     return `posted ${ss} seconds ago`;

   }

 }
  let lowerDiv = [sixStyles.subItemA, sixStyles.subItemB, sixStyles.subItemC, sixStyles.subItemD, sixStyles.subItemE, sixStyles.subItemF]
  let six = [x.articles[0], x.articles[1], x.articles[2], x.articles[3], x.articles[4], x.articles[5]];
  return (<div className={sixStyles.subStoryCont}>
 {six.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.url}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={sixStyles.catTitle}>{x.name}</h5>
                 <h5 className={sixStyles.subCatTitle}>{subs[art.subcategorization_id]}</h5>
                <img className={sixStyles.sixImg} src={art.fallback[0]}/>
                <h3 className={sixStyles.threeHeader}>{art.title}</h3>
                <h6 className={sixStyles.threeTimeFooter}>{countDown(art)}</h6>
                 
                <div/>        
              </div>
             </Link>) })} 
    </div>)
}



export default Six