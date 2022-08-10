import { Link } from "react-router-dom";

import { Title } from '../Components';
import { LoadJSON, strRemoveUmlauts } from "../DataHandler";

import './CSS/Themen.css'

export default function Predigtreihen(){
    document.title = "FBG Bremen - Predigtreihen";

    let playlists = LoadJSON("Data/playlists.json");
    if(playlists === undefined) return;

    return (
        <>
            <Title title="Predigtreihen"/>

            <ThemenBlock data={playlists.list}/>
        </>
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
        <Link to={'/predigtreihen/' + (playlist.urlExtension === undefined ? strRemoveUmlauts(playlist.theme.toLowerCase()) : playlist.urlExtension)} className="themaButton-shell">
            {playlist.imgSrc !== "" && <img className="themaButton-img" src={playlist.imgSrc} alt={playlist.imgSrc}/>}
            <h2 className="themaButton-text">{playlist.theme}</h2>
        </Link>
    );
}