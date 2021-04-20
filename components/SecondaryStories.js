import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';
import Three from './Three';
import Four from './Four';
import Six from './Six';

const SecondaryStories = ({sortedArticles}) => {
  let globalState = useAppContext().catagories;
    let lowerDiv = [indexStyles.subItemA, indexStyles.subItemB, indexStyles.subItemC]
  return(
       <div>
         {sortedArticles.map((x, ind) => { 

            let url = ind
            let el; 
            switch (x.name) {
                    case 'Local News':
                      el = <Six x={x}/>
                      break;
                        case 'Community':
                      el = <Four x={x}/>
                      break;
                        case 'The Arts':
                      el = <Four x={x}/>
                      break;
                    default:
                    el = <Three x={x}/>
                    
                  }
                  
            return(
              <div key={ind} className={indexStyles.subStoryDiv}>
                <h1>{x.name}</h1>
                <Link key={x.id} href="[category]" as={`/${x.name}`}>           
                 <div className={indexStyles.arrowBox}><img src="/images/arrow.png" className={indexStyles.arrow}/></div>
                </Link>
                <div className={indexStyles.underline}/>       
                  {el}
                </div>  )})}
              </div>
                   ) 
}


export default SecondaryStories