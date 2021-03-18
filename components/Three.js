
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';
const three =({x}) => {
  let lowerDiv = [indexStyles.subItemA, indexStyles.subItemB, indexStyles.subItemC]
  let three = [x.articles[0], x.articles[1], x.articles[2]];
  
  return (
       <div  className={indexStyles.subStoryCont}>
         {three.map((art, ind) =>{
           
           return(  
             <Link key={art.id} href="article/[article]" as={`/article/${art.id}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={indexStyles.catTitle}>{x.name}</h5>
                <img className={indexStyles.threeImg} src={art.fallback[0]}/>
                <h3 className={indexStyles.threeHeader}>{art.title}</h3>
                <h6 className={indexStyles.threeTimeFooter}>{x.date}</h6>    
                <div/>     
              </div>
             </Link>) })}             
         </div>
          )
}

export default three