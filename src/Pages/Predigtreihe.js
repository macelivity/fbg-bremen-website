import { Video } from '../Components';
import { strArrayToText } from '../DataHandler';

export default function Predigtreihe(props){
    document.title = "FBG Bremen - " + props.playlist.theme;

    return (
        <div id="predigtreihe">
            <Header playlist={props.playlist}/>
            
            <div className="content-field">
                <Description playlist={props.playlist}/>
                <Videos playlist={props.playlist}/>
            </div>
        </div>
    );
}

function Header(props){
    return(
        <div className="header">
            {props.playlist.imgSrc !== undefined && <img className="img" src={props.playlist.imgSrc} alt={props.playlist.imgSrc}/>}
            <h1 className="title">{props.playlist.theme}</h1>
        </div>
    )
}

function Description(props){
    return(
        <div className="description">
            <p className="text">{ strArrayToText(props.playlist.description) }</p>
        </div>
    )
}

function Videos(props){
    return (
        <div className="videos">
            {props.playlist.entries.map((entry) => {
                return <VideoEntry url={entry.url} title={entry.title} subtitle={entry.subtitle} key={entry.title}/>
            })}
        </div>
    );
}

function VideoEntry(props){
    return(
        <div className="entry">
            <div className="video-container">
                <Video url={props.url}/>
            </div>
            <div className="text">
                <h2 className="title">{props.title}</h2>
                {props.subtitle != null && <h3 className="subtitle">{props.subtitle}</h3>}
            </div>
        </div>
    );
}
