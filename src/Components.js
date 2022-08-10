import React from 'react';
import './CSS/Main.css'

export function Title(params){
    return(
        <div className="title">
            <h1>{params.title}</h1>
        </div>
    );
}

export function SubTitle(params){
    return(
        <div className="subtitle">
            <h3>{params.title}</h3>
        </div>
    );
}


export function Video (props){
    return (
        <iframe className="videoFrame" src={URLtoEmbed(props.url)} title={props.url} allowFullScreen={true}/>
    );
}

function URLtoEmbed(url){
    var startIndex = url.search("v=");
    if(startIndex === -1) return "https://www.youtube-nocookie.com/embed/" + url;

    return "https://www.youtube-nocookie.com/embed/" + url.substring(startIndex + 2);
}
