import { PlateGenerator } from "./page/plate-gernerator/plate-generator";
import './App.css';
import { createContext, useState } from "react";

export const PageContext = createContext({lang: '', dimens: ''});

function App() {

  const [lang, setLang] = useState<string>('de');
  const [dimens,  setDimens] = useState<string>('cm')
  return (
    <>
      <PageContext.Provider value={{lang, setLang, dimens, setDimens}}>
        <PlateGenerator />
      </PageContext.Provider>
    </>
  )
}

export default App
