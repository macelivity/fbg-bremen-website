import { Link } from "react-router-dom";

import { Title } from '../Components';
import { LoadJSON, strRemoveUmlauts } from "../DataHandler";

export default function Predigtreihen(){
    document.title = "FBG Bremen - Predigtreihen";

    let playlists = LoadJSON("Data/playlists.json");
    if(playlists === undefined) return;

    return (
        <div id="themen">
            <Title title="Predigtreihen"/>

            <div className="content-field">
                <ThemenBlock data={playlists.list}/>
            </div>
        </div>
    );
}

function ThemenBlock(props){
    return (
        <div className="buttonsContainer">
            {props.data.map((playlist) => { return <ThemaButton playlist={playlist} key={playlist.theme}/> })}
        </div>
    );
}

function ThemaButton(props){
    let playlist = props.playlist;

    return(
        <Link to={'/predigtreihen/' + (playlist.urlExtension === undefined ? strRemoveUmlauts(playlist.theme.toLowerCase()) : playlist.urlExtension)} className="themaButton">
            {playlist.imgSrc !== "" && <img className="img" src={playlist.imgSrc} alt={playlist.imgSrc}/>}
            <h2 className="text">{playlist.theme}</h2>
        </Link>
    );
}