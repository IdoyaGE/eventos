import '../css/EventModal.css'
import {useState, useEffect} from 'react';
//prop event 
const EventModal = ({event, className, close}) => {
    const[currentClassname, setCurrentClassname] = useState(null);
//Creamos una variable de estado CurrentClassName y con el useEffect actualizamos su estado (se renderiza con el estado y no con el prop)

useEffect(() => {
        setCurrentClassname(className);

    },[className]);

    const closeModal = () => {
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

export default EventModal;
