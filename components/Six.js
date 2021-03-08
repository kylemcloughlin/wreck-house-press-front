import Link from 'next/link';
import sixStyles from '../styles/Six.module.css';
const Six = ({x}) => {
let lowerDiv = [sixStyles.subItemA, sixStyles.subItemB, sixStyles.subItemC, sixStyles.subItemD, sixStyles.subItemE, sixStyles.subItemF]
  let six = [x.articles[0], x.articles[1], x.articles[2], x.articles[3], x.articles[4], x.articles[5]];
  return (<div className={sixStyles.subStoryCont}>
 {six.map((art, ind) =>{
           console.log(art.photos)
           return(  
             <Link key={x.id} href="article/[article]" as={`/article/${art.id}`}> 
              <div className={lowerDiv[ind]}>
                <h5 className={sixStyles.catTitle}>{x.name}</h5>
             <div className={sixStyles.imgHolder}>
                <img className={sixStyles.sixImg} src={art.photos[0]}/>
             </div>
                <h3 className={sixStyles.threeHeader}>{art.title}</h3>
                <h6 className={sixStyles.threeTimeFooter}>6 hour Ago</h6>         
              </div>
             </Link>) })} 
    </div>)
}



export default Six