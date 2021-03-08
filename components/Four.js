import Link from 'next/link';
import fourStyles from '../styles/Four.module.css';
const Four = ({x}) => {
  let lowerDiv = [fourStyles.subItemA, fourStyles.subItemB, fourStyles.subItemC, fourStyles.subItemD]
  let four = [x.articles[0], x.articles[1], x.articles[2], x.articles[3]];
  return (<div className={fourStyles.subStoryCont}>
 {four.map((art, ind) =>{
           console.log(art.photos)
           return(  
             <Link key={x.id} href="article/[article]" as={`/article/${art.id}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={fourStyles.catTitle}>{x.name}</h5>
             <div className={fourStyles.imgHolder}>
                <img className={fourStyles.threeImg} src={art.photos[0]}/>

             </div>
                <h3 className={fourStyles.threeHeader}>{art.title}</h3>
                <h6 className={fourStyles.threeTimeFooter}>6 hour Ago</h6>         
              </div>
             </Link>) })} 
    </div>)
}


export default Four 