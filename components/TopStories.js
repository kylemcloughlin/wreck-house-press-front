import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';
import Advert from './Advert.js';


const TopStories = ({ topStory, title}) => {
  let globalState = useAppContext().catagories;
  let subs = useAppContext().subcatagories;

  const countDown = (x) => {
  let input = null
  if (x.legacy === true) {
    input = x.originalPost
  } else {
    input = x.publish_time
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
  return (
            <div className={indexStyles.topStory}>
        <h1 className={indexStyles.title}>Current Headlines</h1>
        <div className={indexStyles.underline}/> 
    <div className={indexStyles.storiesContainer}>
  
          {topStory.map((x, ind)=> {
             let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
           
            return(
              <Link key={x.id} href="article/[article]" as={`/article/${x.url}`}> 
            <div value="xxx" className={x.style}>
               <img src={x.fallback[0]} style={visible}/> 
               <h5 className={indexStyles.catTitle}>{globalState[x.categorization_id]}</h5>
               <h5 className={indexStyles.subCatTitle}>{subs[x.subcategorization_id]}</h5>
               <h2 className={indexStyles.header}>{x.title}</h2>
               <h6 className={indexStyles.timeFooter}>{countDown(x)} </h6>
               <div/>
            </div>
            </Link>)
          })}
     
        </div>
  
    </div>
    )
}

export default TopStories