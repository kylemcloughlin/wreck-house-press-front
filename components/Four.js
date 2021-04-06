import Link from 'next/link';
import fourStyles from '../styles/Four.module.css';
const Four = ({x}) => {
   const countDown = (x) => {
     let date2 = new Date(); // 9:00 AM
     let date1 = new Date(x);
     let diff = date2 - date1;
     let msec = diff;
     let ss = Math.floor(msec / 1000);
     let mm = Math.floor(msec / 1000 / 60);
     let hh = Math.floor(msec / 1000 / 60 / 60);
     let days = Math.floor(hh / 24)
     let years = Math.floor(days / 365)
     // let year  = 
    //  console.log(`years: ${years} days: ${days} hh: ${hh / 24} mm: ${mm} `)
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
  let lowerDiv = [fourStyles.subItemA, fourStyles.subItemB, fourStyles.subItemC, fourStyles.subItemD]
  let four = [x.articles[0], x.articles[1], x.articles[2], x.articles[3]];
  return (<div className={fourStyles.subStoryCont}>
 {four.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.url}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={fourStyles.catTitle}>{x.name}</h5>
                <img className={fourStyles.threeImg} src={art.fallback[0]}/>
                <h3 className={fourStyles.threeHeader}>{art.title}</h3>
                <h6 className={fourStyles.threeTimeFooter}>{countDown(art.originalPost)}</h6>    
                <div/>     
              </div>
             </Link>) })} 
    </div>)
}


export default Four 