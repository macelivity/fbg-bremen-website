import { Link } from "react-router-dom";
import { Title, SubTitle } from "../Components.js";
import { LoadJSON } from "../DataHandler.js";

import './CSS/Gottesdienste.css';

export default function Gottesdienste(props){
    let allLanguagesTxt = LoadJSON("Data/gottesdienstTxt.json");
    if(allLanguagesTxt === undefined) return;
    
    let isGerman = props.lan === "ger";

    let contentTxt = allLanguagesTxt.german;
    if(!isGerman) contentTxt = allLanguagesTxt.russian;

    document.title = contentTxt.documentTitle;

    return (
        <>
            <Title title={contentTxt.title}/>

            <Zeitplan contentTxt={contentTxt}/>

            <SubTitle title={contentTxt.anfahrtTitle}/>
            <Anfahrt contentTxt={contentTxt}/>
        </>
    );
}

function LanguageBtn(props){
    return(
        <Link to={props.isGerman ? "/russian" : "/gottesdienste"} className="languageBtn-shell">
            <button className="languageBtn">Lan</button>
        </Link>
    );
}

function Zeitplan(props){
    return(
        <div className="zeitplan-shell">
            <table className="zeitplan">
                <tbody>
                    {props.contentTxt.terminTabelle.map((termin) => {
                        return(
                            <tr key={termin.tag + termin.uhrzeit}>
                                <td>{termin.tag}</td>
                                <td>{termin.uhrzeit}</td>
                                <td>{termin.typ}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


function Anfahrt(props){
    return(
        <div className="anfahrtPanel">
            <div className="address-map-shell">
                <Map/>
                <div className="addressPanel">
                    <h3 className="addressParagraph">{props.contentTxt.adresse.title}</h3>
                    <p className="addressParagraph">{props.contentTxt.adresse.strasse}</p>
                    <p className="addressParagraph">{props.contentTxt.adresse.ort}</p>
                    <a href="https://goo.gl/maps/XzEENGdEWXFMUCDt7" target="_blank">
                        <p className="googleMapsBtn">{props.contentTxt.mapsBtn}</p>
                    </a>
                </div>
            </div>
            <Wegbeschreibung contentTxt={props.contentTxt}/>
        </div>
    );
}

function Map(){
    return(
        <img className="map" src="Sprites/map.png" alt="map"/>
    );
}

function Wegbeschreibung(props){
    return(
        <div className="wegbeschreibungPanel">
            <h3 className="wegbeschreibungParagraph">{props.contentTxt.wegbeschreibung.title}</h3>
            {props.contentTxt.wegbeschreibung.absaetze.map((str) => {
                return <p className="wegbeschreibungParagraph" key={str}>{str}</p>
            })}
        </div>
    )
}