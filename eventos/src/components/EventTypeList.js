import {useState, useEffect} from "react";
import '../css/EvenType.css';

//Sacar todos los eventos de la API y sacarlos en una lista
//llamar a la API cuando se inicialice el componente (useEffect), para que no entre en bucle
const EventTypeList = () =>{
    const [eventTypes, setEventTypes]= useState([]); 
//Array vacio para que el map no falle hasta que se realice el fetch y se ejecute una vez
    useEffect( () => {
        fetch ("https://api.euskadi.eus/culture/events/v1.0/eventType")
        .then (response => response.json())
        .then (data => {
//Se obtienen los datos de la API
            setEventTypes (data);
        });
    },[]);
//Hacemos un map y creamos para cada evento los elementos que queremos mostrar
const handleButtonClick = (eventType) => {
    // Aquí puedes hacer lo que quieras al hacer clic en el botón de un evento
    console.log(`Se hizo clic en el botón para el evento ${eventType.nameEs}`);
};

return (
    <div>
        <h2>Tipo de eventos</h2>
        <ul>
            {eventTypes.map (eventType =>(
                <li key={eventType.id}>
                    <button onClick={() => handleButtonClick(eventType)}>{eventType.nameEs}</button>
                </li>
            ))}
        </ul>
    </div>
);
};

export default EventTypeList;