import Link from 'next/link';
import fourStyles from '../styles/Four.module.css';
import { useAppContext  } from '../context/AppContext';

const Four = ({x}) => {
  const subs = useAppContext().subcatagories;
   const countDown = (x) => {
    let input = null
    if (x.legacy === 't') {
      let split = x.originalPost
      input = x.originalPost
     
    } else {
  
      input = x.publish_time
    }
     let date1 = new Date(input);
    //  console.log(date1)
     let date2 = new Date(); // 9:00 AM
     let diff = date2 - date1;
     let msec = diff;
     let ss = Math.floor(msec / 1000);
     let mm = Math.floor(msec / 1000 / 60);
     let hh = Math.floor(msec / 1000 / 60 / 60);
     let days = Math.floor(hh / 24)
     let years = Math.floor(days / 365)

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
  let lowerDiv = [fourStyles.subItemA, fourStyles.subItemB, fourStyles.subItemC, fourStyles.subItemD]
  let four = [x.articles[0], x.articles[1], x.articles[2], x.articles[3]];
  return (<div className={fourStyles.subStoryCont}>
 {four.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.url}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={fourStyles.catTitle}>{x.name}</h5>
                <h5 className={fourStyles.subCatTitle}>{subs[art.subcategorization_id]}</h5>
                <img className={fourStyles.threeImg} src={art.fallback[0]}/>
                <h3 className={fourStyles.threeHeader}>{art.title}</h3>
                <h6 className={fourStyles.threeTimeFooter}>{countDown(art)}</h6>    
                <div/>     
              </div>
             </Link>) })} 
    </div>)
}



export default Four 