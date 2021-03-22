import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  let sharedState = {
    subCatagories: ['Letters', 'Columnists', 'Profile', "Music Row", "On The Bookshelf"],
    catagories: ["home", "Top Story", "Local News", "Sports", "Opinion", "Community", "The Arts"]  
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  // console.log(AppContext.)
  return useContext(AppContext);
}
