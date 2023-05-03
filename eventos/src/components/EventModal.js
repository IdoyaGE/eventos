import '../css/EventModal.css'
import { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../App';

const EventModal = ({event,className,close}) => {
    const [currentClassname, setCurrentClassname] =useState(null);
    const language = useContext(LanguageContext);
useEffect (() => {
    setCurrentClassname(className);
},[className]);

const closeModal = (event) =>{
    event.stopPropagation(); // stop propagation 
    setCurrentClassname(null);
    close();
}
const name = {
    'eu': event.nameEu,
    'es': event.nameEs,
}
const municipality = {
    'eu': event.municipalityEu,
    'es': event.municipalityEs,
}
const description = {
    'eu': event.descriptionEu,
    'es': event.descriptionEs,
}
const openingHours = {
    'eu': event.openingHoursEu,
    'es': event.openingHoursEs,
}
const closeMessage ={
    "eu" : "Itxi",
    "es" : "Cerrar"
};
    return (
        <div>
            <section className={"modal-background " + currentClassname} onClick={(closeModal)}> </section>
            <article className={"modal " + currentClassname}>
                
                <h1>{name[language]}</h1> 
                <section className="horizontal"> 
                    <article className="horizontal-container">
                        <p>{municipality[language]}</p>
                        <p>{event.startDate.split("T")[0]}, {openingHours[language]}</p>
                        <p>{event.priceEs}</p>
                    </article> 
                    <article className="horizontal-container">
                    {event.images.length > 0 ?
                    <img className="image"src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>
                                    : <img className="noimage" src="./img/imgen default no image.jpeg" alt="imagen no disponible" />}
                    </article>
                </section>
                <div dangerouslySetInnerHTML={{__html: description[language]}}></div>
                <button onClick={closeModal}> {closeMessage[language]}</button>
            </article>
        </div>
    )
}

export default EventModal;
/*import '../css/EventModal.css'
import {useState, useEffect} from 'react';
//prop event 
const EventModal = ({event, className, close}) => {
    const[currentClassname, setCurrentClassname] = useState(null);
//Creamos una variable de estado CurrentClassName y con el useEffect actualizamos su estado (se renderiza con el estado y no con el prop)

useEffect(() => {
        setCurrentClassname(className);

    },[className]);
//Si haces click en un evento que está dentro de otro, no se propaga
    const closeModal = (event) => {
        event.stopPropagation();
        setCurrentClassname(null);
        close(); //le estamos cambiando el estado al parent
    }

    return(
    <div>
        <section className={"modal-background" + currentClassname} onClick ={closeModal}></section>
        <article className={"modal" + currentClassname}>
                
                <h1>{event.nameEs}</h1>
                <section className="horizontal">
                    <article className="horizontal-container">                <p>{event.municipalityEs}</p>
                        <p>{event.municipalityEs}</p>
                        <p>{event.priceEs}</p>
                        <p>{event.startDate.split("T")[0]}</p>
                        <p>{event.openingHoursEs}</p>
            </article>
            <article className="horizontal-container">
                 {event.images.length > 0? <img src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/>: null}
            </article>
        </section>
        <div dangerouslySetInnerHTML={{__html: event.descriptionEu}}></div> 
        <button onClick={closeModal}>Cerrar</button>
        </article>
    </div>
        

    )
};

export default EventModal;*/
