import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import indexStyles from '../styles/Index.module.css';


const TopStories = ({ topStory, title}) => {
   const countDown = (x) => {
     let today = new Date();
   const oneDay = 24 * 60 * 60 * 1000;
   let secondDate = new Date(x);
   const diffDays = Math.round(Math.abs((today - secondDate) / oneDay));
   return `posted ${diffDays} day's ago`;
   }
    let globalState = useAppContext().catagories;
  return (
            <div className={indexStyles.indexContainer}>
        <h1 className={indexStyles.title}>Current Headlines</h1>
        <div className={indexStyles.underline}/> 
    <div className={indexStyles.storiesContainer}>
  
          {topStory.map((x, ind)=> {
             let visible = ind === 0 ? ({ visibility: 'visible'}) : ({ visibility: 'hidden', width: '0em', height: '0em'})
            //  console.log(x.fallback)
            return(
              <Link key={x.id} href="article/[article]" as={`/article/${x.id}`}> 
            <div value="xxx" className={x.style}>
               <img src={x.fallback[0]} style={visible}/> 
               <h5 className={indexStyles.catTitle}>{globalState[x.categorization_id - 1]}</h5>
               <h2 className={indexStyles.header}>{x.title}</h2>
               <h6 className={indexStyles.timeFooter}>{countDown(x.originalPost)}</h6>
               <div/>
            </div>
            </Link>)
          })}
     
        </div>
    </div>
    )
}

export default TopStories