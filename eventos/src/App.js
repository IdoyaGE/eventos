//import logo from './logo.svg';
import {useState, createContext} from"react";
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';
//Utilizamos los props en EventTypeList y EventList

export const LanguageContext = createContext();
function App() {
const [eventType, setEventType]= useState(0);
const [language,setLanguage]= useState('eu');

return (
      //Metemos dentro del contexto todo lo que queremos cambiar de idioma
  <LanguageContext.Provider value={language}>
    <div className="App">
      <header>
        <section>
        <button className={language=='eu' ? "language selected":""} onClick ={() => setLanguage("eu")}>eu</button>
        <button className={"language" + language=='es' ? "selected":""} onClick ={() => setLanguage("es")}>es</button>
        </section>
        < h1>Eventos en Bizkaia</h1>
      </header>
      <main> 
        <EventTypeList handleClick={setEventType} selectedType = {eventType}/>
        <EventList eventType={eventType}/>
      </main>
    </div>
    </LanguageContext.Provider>
  );
}

export default App;
