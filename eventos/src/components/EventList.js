import {useState, useEffect} from "react";
import '../css/Event.css';

//Sacar todos los eventos de la API y sacarlos en una lista
//llamar a la API cuando se inicialice el componente (useEffect), para que no entre en bucle
const EventList = () =>{
    const [events, setEvents]= useState([]); 
    const [page, setPage]= useState(1); 
    const [totalPages, setTotalPages]= useState(2); 
//Array vacio para que el map no falle hasta que se realice el fetch y se ejecute una vez
    useEffect( () => {
        fetch (`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48`)
        .then (response => response.json())
        .then (data => {
//Se obtienen los datos de la API
            setEvents (data.items);
            setTotalPages(data.totalPages);
        });
//cuando hagamos página siguiente nos vuelve a ejecutar useEffect (ponemos ${})
    },[page]);
//para pasar a la página siguiente 
    const nextPage = () => {
        if (page < totalPages) {
            setPage( page + 1);
        }
    }
    const previousPage = () => {
        if (page > 1) {
            setPage( page - 1);
        }
    }

    return (
        
        <section className="event-list">
            <h2>Eventos</h2>
            <h3>página {page}/{totalPages}</h3> 
            {page >1 && <button onClick={previousPage}>Anterior</button>}
            {page < totalPages && <button onClick={nextPage}>Siguiente</button>}
            <ul>
                {events.map (event =>(
                    <li key={event.id}>
                        <h3>{event.nameEs}/{event.nameEu}</h3>
                        <p>{event.startDate}</p>
                        <p>{event.openingHoursEs}</p>
                        {event.images.length > 0? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>: null}
                    </li>
                ))}
            </ul>
        </section>
    )
}
export default EventList; 