import { Link } from "react-router-dom";

import { Title } from "../Components.js";
import { LoadJSON } from "../DataHandler.js";
import { Rect, TriangleDown, SlopeUp } from "../StylingComponents.js";

export default function Homepage(){
    document.title = "FBG Bremen";

    const data = LoadJSON("Data/homepage.json");
    if(data === undefined) return;

    return (
        <div id="homepage">
            <Title title="FBG-Bremen"/>

            <div className="content-field">
                <TopVerse text={data.top_verse.text} passage={data.top_verse.passage}/>
                
                <div style={{fontSize: 0}}>
                    <TriangleDown/>
                    <Rect/>
                    <SlopeUp/>
                </div>

                <GottesdiensteZeitplan/>
                
                <div className="pagePreviews">
                    <PagePreview title="Gottesdienste" link="/gottesdienste"/>
                    <PagePreview title="Neuigkeiten" link="/veranstaltungen"/>
                    <PagePreview title="Predigten" link="/aktuelle-predigten"/>
                    <PagePreview title="Kontakt" link="/kontakt"/>
                </div>
            </div>
        </div>
    );
}

function TopVerse(props){
    return (
        <div className="top_verse">
            <p className="text">{props.text}</p>
            <p className="passage">{props.passage}</p>
        </div>
    )
}

function PagePreview(props){
    return(
        <Link to={props.link} className="preview">
            <button className="btn">
                <h3>{props.title}</h3>
            </button>
        </Link>
    );
}

function GottesdiensteZeitplan(props){
    let gottesdienste = LoadJSON("Data/gottesdienstTxt.json");
    if(gottesdienste === undefined) return;

    let zeitplan = gottesdienste.german.terminTabelle;

    return (
        <div className="zeitplan homepage">
            <table>
                <tbody>
                    {zeitplan.map((termin) => {
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