import { Title, SubTitle } from "../Components.js";
import { LoadJSON } from "../DataHandler.js";

export default function Gottesdienste(props){
    let allLanguagesTxt = LoadJSON("Data/gottesdienstTxt.json");
    if(allLanguagesTxt === undefined) return;
    
    let isGerman = props.lan === "ger";

    let contentTxt = allLanguagesTxt.german;
    if(!isGerman) contentTxt = allLanguagesTxt.russian;

    document.title = contentTxt.documentTitle;

    return (
        <div id="gottesdienste">
            <Title title={contentTxt.title}/>
            
            <Zeitplan contentTxt={contentTxt}/>

            <SubTitle title={contentTxt.anfahrtTitle}/>
            <Anfahrt contentTxt={contentTxt}/>
        </div>
    );
}

function Zeitplan(props){
    return(
        <div className="zeitplan godi-page">
            <table>
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
        <div className="anfahrt">
            <div className="address-map-shell">
                <Map contentTxt={props.contentTxt}/>
                <div className="address">
                    <h3 className="paragraph">{props.contentTxt.adresse.title}</h3>
                    <p className="paragraph">{props.contentTxt.adresse.strasse}</p>
                    <p className="paragraph">{props.contentTxt.adresse.ort}</p>
                </div>
            </div>
            <Wegbeschreibung contentTxt={props.contentTxt}/>
        </div>
    );
}

function Map(props){
    return(
        <a href="https://goo.gl/maps/WUPk4Cy7PLswe8Es7" className="maps" target="_blank" rel="noreferrer">
            <img className="map" src="Sprites/map.png" alt="map"/>
            <p className="btn">{props.contentTxt.mapsBtn}</p>
        </a>
    );
}

function Wegbeschreibung(props){
    return(
        <div className="wegbeschreibung">
            <h3 className="paragraph">{props.contentTxt.wegbeschreibung.title}</h3>
            {props.contentTxt.wegbeschreibung.absaetze.map((str) => {
                return <p className="paragraph" key={str}>{str}</p>
            })}
        </div>
    )
}