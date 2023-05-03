import {useState, useEffect,useContext} from "react";
import '../css/EvenType.css';
import {LanguageContext} from "../App";

//Sacar todos los eventos de la API y sacarlos en una lista
//llamar a la API cuando se inicialice el componente (useEffect), para que no entre en bucle
const EventTypeList =({handleClick, selectedType}) =>{
    const [eventTypes, setEventTypes]= useState([]); 
    const language = useContext(LanguageContext);
//Array vacio para que el map no falle hasta que se realice el fetch y se ejecute una vez
    useEffect( () => {
        fetch ("https://api.euskadi.eus/culture/events/v1.0/eventType")
        .then (response => response.json())
        .then (data => {
//Se obtienen los datos de la API
            setEventTypes (data);
        });
    },[]);
    const allName ={
        "eu" : "Guztiak",
        "es" : "Todos"
    };

return (
    <div>
        <h4>Tipos de eventos</h4>
        <ul className="eventbutton">
                <li className={selectedType === 0 ? "selected button" : "button"} onClick={()=> handleClick(0)}>{allName[language]}</li>
            {eventTypes.map (eventType => {
                const name ={
                    'eu': eventType.nameEu,
                    'es': eventType.nameEs,
                };

             // montramos datos de id de name es dos idiomas en una lista 
                return <li className={selectedType === eventType.id ? "selected button" : "button"} key={eventType.id} onClick={()=> handleClick(eventType.id)}>
                   {/*  <img class="icons" src={`/img/${eventType.nameEs.toLowerCase()}.png`} alt={eventType.nameEs} /> */}
                    {name[language]} {/* / {eventType.nameEu}  creamos un elemento de lista*/}
                </li>
            })}
        </ul>
    </div>
);
};

export default EventTypeList;