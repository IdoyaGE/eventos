import {useState, useEffect, useRef,useContext} from "react";
import '../css/Event.css';
import EventModal from './EventModal';
import { LanguageContext } from "../App";

//Sacar todos los eventos de la API y sacarlos en una lista
//llamar a la API cuando se inicialice el componente (useEffect), para que no entre en bucle
// para no poner props.eventType ponemos eventType entre llaves 
const EventList = ({eventType}) =>{
    const [events, setEvents]= useState([]); 
    const [page, setPage]= useState(1); 
    const [totalPages, setTotalPages]= useState(1); 
    const [selectedEvent, setSelectedEvent]= useState(null);  
    const [searchWords, setSearchWords]= useState(""); 
    const tittleRef= useRef(null);
    const language= useContext(LanguageContext);
    //Array vacio para que el map no falle hasta que se realice el fetch y se ejecute una vez
    //UseEffect 
useEffect(() => {
    setEvents([]);
    setPage(1);
},[eventType]);


useEffect(() => {
        getData()
        .then (data => {
//Se obtienen los datos de la API, array con ...coge el elemento anterior y añade eventos, array entero une los dos elementos (para scroll infinito)
// Coger el elemento nuevo y hacer un push con ambos elementos
            setEvents ([...events,...data.items]);
            setTotalPages(data.totalPages);
        });
//cuando hagamos página siguiente nos vuelve a ejecutar useEffect (ponemos ${})
    },[page]);

    useEffect( () => {
        getData () 
        .then (data => {
//Se obtienen los datos de la API, array con ...coge el elemento anterior y añade eventos, array entero une los dos elementos (para scroll infinito)
// Coger el elemento nuevo y hacer un push con ambos elementos
            setEvents (data.items);
            setTotalPages(data.totalPages);
        });
//cuando hagamos página siguiente nos vuelve a ejecutar useEffect (ponemos ${})
    },[eventType]);

useEffect( () => {
    if(searchWords.length < 3 && searchWords !==""){
        return;
    }
    getData()
        .then (data => {
//Se obtienen los datos de la API, array con ...coge el elemento anterior y añade eventos, array entero une los dos elementos (para scroll infinito)
// Coger el elemento nuevo y hacer un push con ambos elementos
            setEvents (data.items);
            setTotalPages(data.totalPages);
        });
//cuando hagamos página siguiente nos vuelve a ejecutar useEffect (ponemos ${})
    },[searchWords]);

    const getData = () => {
        const type =eventType !== 0 ? `&type=${eventType}`: "";
        const search = searchWords.length < 3 && searchWords.length > 0 ? "" : `&description=${searchWords}`;
        return new Promise((resolve, reject) => {
            fetch (`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
            .then (response => response.json())
            .then (data => {
                resolve(data);
            })
            .catch( error => {
                reject(error);
            });
    
            });   
        }




//para pasar a la página siguiente 
    const nextPage = () => {
        if (page < totalPages) {
            setPage( page + 1);
        }
    }
    //const previousPage = () => {
        //if (page > 1) {
            //setPage( page - 1);
       // }
    //}
    const goToTop = () => {
        tittleRef.current.scrollIntoView({behavior: "smooth"});
        console.log(tittleRef.current.textContent);
    }
    const showMore = {
        "eu": "Gehiago ikusi",
        "es": "Mostrar más"
    }
    const goUp = {
        "eu": "Gora joan",
        "es": "Ir arriba"
    }
    const eventTitle = {
        "eu": "Ekitaldiak",
        "es": "Eventos"
    }

    return (
    //tittleRef para poner un botón para subir al inicio    
        <section className="event-list">
            <h2 ref={tittleRef}>{eventTitle[language]}</h2>
            <input type="text" value={searchWords} onChange={(e) =>setSearchWords(e.target.value)} />
            <h3>página {page}/{totalPages}</h3> 
           

            <ul>
                {events.map( event =>{// montramos datos de id de name es dos idiomas en una lista 
                       const translation = {
                        name: {
                            eu: event.nameEu,
                            es: event.nameEs,
                        },
                        municipality: {
                            eu: event.municipalityEu,
                            es: event.municipalityEs,
                        },
                        description: {
                            eu: event.descriptionEu,
                            es: event.descriptionEs,
                        },
                        openingHours: {
                            eu: event.openingHoursEu,
                            es: event.openingHoursEs,
                        },
                       };
                       return <li className="imagecard" key={event.id} onClick={()=>setSelectedEvent(event.id)}>
                            {event.images.length > 0 ?
                            <img className="shadow" src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>
                            : <img className="noimage" src="./img/imgen default no image.jpeg" alt="imagen no disponible" />}
                            <h3>{translation.name[language]}</h3>
                            <p className="place" >{event.establishmentEs} - {event.municipalityEu}</p>
                            <p>{translation.openingHours[language]}</p>
                            <p>{event.priceEs}</p>
                            <EventModal event={event} className={selectedEvent === event.id ? "show" : ""} close={()=>setSelectedEvent(null)}/>
                        </li>
})}
            </ul>
            {page < totalPages && <button onClick={nextPage}>{showMore[language]}</button>}
            <button onClick ={goToTop}>{goUp[language]}</button>
        </section>
    )

}

export default EventList; 