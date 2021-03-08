
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';
const three =({x}) => {
  let lowerDiv = [indexStyles.subItemA, indexStyles.subItemB, indexStyles.subItemC]
  let three = [x.articles[0], x.articles[1], x.articles[2]];
  console.log(three)
  return (
       <div  className={indexStyles.subStoryCont}>
         {three.map((art, ind) =>{
           console.log(art.photos)
           return(  
             <Link key={x.id} href="article/[article]" as={`/article/${art.id}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={indexStyles.catTitle}>{x.name}</h5>
             <div className={indexStyles.imgHolder}>
                <img className={indexStyles.threeImg} src={art.photos[0]}/>

             </div>
                <h3 className={indexStyles.threeHeader}>{art.title}</h3>
                <h6 className={indexStyles.threeTimeFooter}>6 hour Ago</h6>         
              </div>
             </Link>) })}             
         </div>
          )
}

export default three