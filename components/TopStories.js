import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';


const TopStories = ({ topStory, title}) => {
  let globalState = useAppContext().catagories;
  let subs = useAppContext().subcatagories;

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
    // console.log(`years: ${years} days: ${days} hh: ${hh / 24} mm: ${mm} `)
      if (years > 0) {
        return `posted ${years} years ago`;
      } else if (days > 0) {
        return `posted ${days} days ago`;

      } else if ( hh > 0) {
        return `posted ${hh} hours ago`;

      } else if (mm > 0) {
        return `posted ${mm} minutes ago`;

      } else  {
        return `posted ${ss} seconds ago`;

      }
      
     }
  return (
            <div className={indexStyles.indexContainer}>
        <h1 className={indexStyles.title}>Current Headlines</h1>
        <div className={indexStyles.underline}/> 
    <div className={indexStyles.storiesContainer}>
  
          {topStory.map((x, ind)=> {
             let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
            //  console.log(x.fallback)
            return(
              <Link key={x.id} href="article/[article]" as={`/article/${x.url}`}> 
            <div value="xxx" className={x.style}>
               <img src={x.fallback[0]} style={visible}/> 
               <h5 className={indexStyles.catTitle}>{globalState[x.categorization_id]}</h5>
               <h5 className={indexStyles.subCatTitle}>{subs[x.subcategorization_id]}</h5>
               <h2 className={indexStyles.header}>{x.title}</h2>
               <h6 className={indexStyles.timeFooter}>{countDown(x.originalPost)} </h6>
               <div/>
            </div>
            </Link>)
          })}
     
        </div>
    </div>
    )
}

export default TopStories