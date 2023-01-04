import { Title } from "../Components.js";
import { LoadJSON, strArrayToText } from "../DataHandler.js";

export default function Neuigkeiten(){
    document.title = "FBG Bremen - Veranstaltungen";

    let data = LoadJSON("Data/veranstaltungen.json");
    if(data === undefined) return;

    return (
        <div id="veranstaltungen">
            <Title title="Veranstaltungen"/>

            {
                data.news.length === 0 && <p>Scheint als wäre aktuell nichts geplant...</p>
            }
            {
                data.news.length > 0  && data.news.map((obj) => {
                    return <UpcomingEvent imgSrc={obj.imgSrc} key={obj.title}>
                        <h2>{obj.title}</h2>
                        <h3>{obj.date}{obj.endDate !== "" && (" - " + obj.endDate)}</h3>
                        <p className="text">{strArrayToText(obj.text)}</p>
                    </UpcomingEvent>
                })
            }
        </div>
    );
}

export function UpcomingEvent(props){
    return(
        <div className="event-panel">
            <div className="content">
                {props.imgSrc != null && <img className="image" src={props.imgSrc} alt={props.imgSrc}/>}
                {props.imgSrc == null && <div className="image"/>}
                {props.children}
            </div>
        </div>
    );
}