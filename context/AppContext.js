import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = {
    hamburger: [{cat: "Home",subs: null},{cat: "Top Story",subs: null},{cat: "Local News",subs: null},{cat: "Sports",subs: null},{cat:"Opinion", subs:[{name:'Letters', id: 1}, {name:'Columnists',id: 2}]}, {cat:"Community", subs:[{name:'Profile', id: 3}]}, {cat:"The Arts", subs: [{name:"Music Row", id: 4}, {name:"On The Bookshelf", id: 5}]}],
    catagories: ["Home", "Top Story", "Local News", "Sports", "Opinion", "Community", "The Arts"],
    subcatagories: ['', 'Letters', 'Columnists', 'profile', 'Music Row','On the Bookshelf']
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  
  return useContext(AppContext);
}
