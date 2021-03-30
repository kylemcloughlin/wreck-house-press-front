import Link from 'next/link';
import fourStyles from '../styles/Four.module.css';
const Four = ({x}) => {
   const countDown = (x) => {
     let today = new Date();
   const oneDay = 24 * 60 * 60 * 1000;
   let secondDate = new Date(x);
   const diffDays = Math.round(Math.abs((today - secondDate) / oneDay));
   return `posted ${diffDays} day's ago`;
   }
  let lowerDiv = [fourStyles.subItemA, fourStyles.subItemB, fourStyles.subItemC, fourStyles.subItemD]
  let four = [x.articles[0], x.articles[1], x.articles[2], x.articles[3]];
  return (<div className={fourStyles.subStoryCont}>
 {four.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.id}`}> 
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