//import logo from './logo.svg';
import {useState} from"react";
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';
//Utilizamos los props en EventTypeList y EventList
function App() {
const [eventType, setEventType]= useState(0);
    return (
    <div className="App">
      <header>
        < h1>Eventos</h1>
      </header>
      <main> 
        <EventTypeList handleClick={setEventType} selectedType = {eventType}/>
        <EventList eventType={eventType}/>
      </main>
    </div>
  );
}

export default App;
