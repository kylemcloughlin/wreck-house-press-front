import Link from 'next/link';
import sixStyles from '../styles/Six.module.css';
const Six = ({x}) => {
   const countDown = (x) => {
     let today = new Date();
     const oneDay = 24 * 60 * 60 * 1000;
     let secondDate = new Date(x);
     const diffDays = Math.round(Math.abs((today - secondDate) / oneDay));
     return `posted ${diffDays} day's ago`;
   }
let lowerDiv = [sixStyles.subItemA, sixStyles.subItemB, sixStyles.subItemC, sixStyles.subItemD, sixStyles.subItemE, sixStyles.subItemF]
  let six = [x.articles[0], x.articles[1], x.articles[2], x.articles[3], x.articles[4], x.articles[5]];
  return (<div className={sixStyles.subStoryCont}>
 {six.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.id}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={sixStyles.catTitle}>{x.name}</h5>
                <img className={sixStyles.sixImg} src={art.fallback[0]}/>
                <h3 className={sixStyles.threeHeader}>{art.title}</h3>
                <h6 className={sixStyles.threeTimeFooter}>{countDown(art.originalPost)}</h6>
                 
                <div/>        
              </div>
             </Link>) })} 
    </div>)
}



export default Six