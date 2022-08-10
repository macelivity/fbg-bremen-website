import { Title, Video } from '../Components';
import './CSS/Predigtreihe.css'
import { strArrayToText } from '../DataHandler';

export default function Predigtreihe(props){
    document.title = "FBG Bremen - " + props.playlist.theme;

    return (
        <>
            <Title title={props.playlist.theme}/>
            <div className="descriptionArea">
                <p className="descriptionText">{ strArrayToText(props.playlist.description) }</p>
            </div>
            <Videos playlist={props.playlist}/>
        </>
    );
}

function Videos(props){
    return (
        <div className="videosPanel">
            {props.playlist.entries.map((entry) => {
                return <VideoEntry url={entry.url} title={entry.title} subtitle={entry.subtitle} key={entry.title}/>
            })}
        </div>
    );
}

function VideoEntry(props){
    return(
        <div className="videoEntry">
            <div className="videoContainer">
                <Video url={props.url}/>
            </div>
            <div className="videoTextPanel">
                <h2 className="videoTitle">{props.title}</h2>
                {props.subtitle != null && <h3 className="videoSubtitle">{props.subtitle}</h3>}
            </div>
        </div>
    );
}
