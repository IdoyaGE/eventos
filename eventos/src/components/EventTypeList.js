import {useState, useEffect} from "react";
import '../css/EvenType.css';


//Sacar todos los eventos de la API y sacarlos en una lista
//llamar a la API cuando se inicialice el componente (useEffect), para que no entre en bucle
const EventTypeList =({handleClick, selectedType}) =>{
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
        <h4>Tipos de eventos</h4>
        <ul className="eventbutton">
                <li className={selectedType === 0 ? "selected button" : "button"} onClick={()=> handleClick(0)}>Todos</li>
            {eventTypes.map (eventType => ( // montramos datos de id de name es dos idiomas en una lista 
                <li className={selectedType === eventType.id ? "selected button" : "button"} key={eventType.id} onClick={()=> handleClick(eventType.id)}>
                   {/*  <img class="icons" src={`/img/${eventType.nameEs.toLowerCase()}.png`} alt={eventType.nameEs} /> */}
                    {eventType.nameEs} {/* / {eventType.nameEu}  creamos un elemento de lista*/}
                </li>
            ))}
        </ul>
    </div>
);
};

export default EventTypeList;