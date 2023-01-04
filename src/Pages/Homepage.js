import { Link } from "react-router-dom";

import { Title, SubTitle, Video } from "../Components.js";
import { LoadJSON, useGetLatestVideos, strArrayToText } from "../DataHandler.js";

export default function Homepage(){
    document.title = "FBG Bremen";

    const data = LoadJSON("Data/homepage.json");
    if(data === undefined) return;

    return (
        <div id="homepage">
            <Title title="FBG-Bremen"/>

            <div className="content-field">
                <TopVerse text={data.top_verse.text} passage={data.top_verse.passage}/>

                <GottesdienstePreview/>

                <News/>

                <PredigtenPreview/>

                <FuenfSolas/>
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


function News(){
    let data = LoadJSON("Data/veranstaltungen.json");
    if(data === undefined || data.news.length === 0) return;

    return (
        <>
            <SubTitle title="Veranstaltungen" className="newsTitle"/>
            {data.news.map((n) => <div className="event" key={n.title}>
                <div className="event-header">
                    <h3 className="title">{n.title}</h3>
                    <p className="date">{n.date}{n.endDate !== "" && (" - " + n.endDate)}</p>
                </div>
                <div className="event-content">
                    {n.imgSrc != null && <img className="image" src={n.imgSrc} alt={n.imgSrc}/>}
                    <p className="text">{strArrayToText(n.text)}</p>
                </div>
            </div>)}
        </>
    );
}


function GottesdienstePreview(){
    let gottesdienste = LoadJSON("Data/gottesdienstTxt.json");
    if(gottesdienste === undefined) return;

    let zeitplan = gottesdienste.german.terminTabelle;

    return (
        <>
            <SubTitle title="Unsere Gottesdienste"/>
            <div className="gottesdienste-preview">
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
                <div className="invitation">
                    <p className="text">Kommen Sie uns gerne mal besuchen!</p>
                    <Link to="/gottesdienste" className="btn-link">
                        <button>
                            <p>Zur Wegbeschreibung</p>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

function FuenfSolas(){
    return (
        <>
            <SubTitle title="Unser Glaube"/>
            <div className="solas-panel">
                <Sola title="Gottes Wort" sola="Sola Scriptura" icon="/Icons/Solas/Scriptura-icon.svg" verse={{text: "Wahrlich, wahrlich, ich sage euch: Wer mein Wort hört und dem glaubt, der mich gesandt hat, der hat ewiges Leben und kommt nicht ins Gericht, sondern er ist vom Tod zum Leben hindurchgedrungen.", passage: "Johannes 5, 24"}}/>
                <Sola title="durch Jesus Chrisus" sola="Solus Christus" icon="/Icons/Solas/Christos-icon.svg" verse={{text: "In ihm war das Leben, und das Leben war das Licht der Menschen. Und das Licht leuchtet in der Finsternis, und die Finsternis hat es nicht begriffen.", passage: "Johannes 1, 4-5"}}/>
                <Sola title="durch Glauben" sola="Sola Fide" icon="/Icons/Solas/Fide-icon.svg" verse={{text: "weil wir erkannt haben, dass der Mensch nicht aus Werken des Gesetzes gerechtfertigt wird, sondern durch den Glauben an Jesus Christus, so sind auch wir an Christus Jesus gläubig geworden, damit wir aus den Glauben an Christus gerechtfertigt würden", passage: "Galater 2, 16a"}}/>
                <Sola title="aus Gnade" sola="Sola Gratia" icon="/Icons/Solas/Gratia-icon.svg" verse={{text: "denn alle haben gesündigt und verfehlen die Herrlichkeit, die sie vor Gott haben sollten, sodass sie ohne Verdienst gerechtfertigt werden durch seine Gnade aufgrund der Erlösung, die in Christus Jesus ist.", passage: "Römer 3, 23-24"}}/>
                <Sola title="zu Gottes Ehre" sola="Soli Deo Gloria" icon="/Icons/Solas/Deo-Gloria-icon.svg" verse={{text: "Würdig bist du, o Herr zu empfangen den Ruhm und die Ehre und die Macht; denn du hast alle Dinge geschaffen, und durch deinen Willen sind sie und wurden sie geschaffen!", passage: "Offenbarung 4, 11"}}/>
            </div>
        </>
    );
}

function Sola(props){
    return (
        <div className="sola">
            <div className="flip-card">
                <div className="sola-content">
                    <img className="icon front" src={process.env.PUBLIC_URL + props.icon} alt={props.sola + " - Icon"}/>
                    <img className="flip-icon front" src="/Icons/Interface/flip-page_icon.svg" alt="flip page icon"/>
                    <div className="verse back">
                        <p className="text">{props.verse.text}</p>
                        <p className="passage">{props.verse.passage}</p>
                    </div>
                </div>
            </div>

            <div className="topic">
                <p className="title">{props.title}</p>
                <p className="subtitle">{props.sola}</p>
            </div>
        </div>
    );
}


function PredigtenPreview(){
    let video = useGetLatestVideos()[0];
    if (video === undefined) return;

    return (
        <>
            <SubTitle title="Lehre"/>
            <div className="predigten-preview">
                <div className="video">
                    <Video url={video.link}/>
                    <p>{video.title}</p>
                </div>

                <div className="lehre">
                    <div className="vers">
                        <p>„Wir aber predigen den gekreuzigten Christus...”</p>
                        <p>1. Korinther 1, 23a</p>
                    </div>

                    <Link to="/aktuelle-predigten" className="btn-link">
                        <button>
                            <p>Weitere Predigten</p>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}