import { Title, SubTitle } from "../Components.js";
import { LoadJSON, strArrayToText } from "../DataHandler.js";

import './CSS/Neuigkeiten.css';

export default function Neuigkeiten(){
    document.title = "FBG Bremen - Neuigkeiten";

    let data = LoadJSON("Data/neuigkeiten.json");
    if(data === undefined) return;

    return (
        <>
            <Title title="Neuigkeiten"/>

            {data.news.map((obj) => {
                return <UpcomingEvent title={obj.title} imgSrc={obj.imgSrc} key={obj.title}>
                    <h3>{obj.date}{obj.endDate !== "" && (" - " + obj.endDate)}</h3>
                    <p className="eventText">{strArrayToText(obj.text)}</p>
                </UpcomingEvent>
            }) }
        </>
    );
}

export function UpcomingEvent(props){
    return(
        <div className="eventPanel">
            <SubTitle title={props.title}/>
            <div className="eventContent">
                {props.imgSrc != null && <img className="eventImage" src={props.imgSrc} alt={props.imgSrc}/>}
                {props.imgSrc == null && <div className="eventImage"/>}
                {props.children}
            </div>
        </div>
    );
}