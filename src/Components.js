import React from 'react';

import './CSS/Components/Titles.css';
import './CSS/Components/Video.css';

export function Title(props){
    return(
        <div className="title-component">
            <div className="topLine"/>
            <p className="title">{props.title}</p>
        </div>
    );
}

export function SubTitle(props){
    return(
        <div color={props.color} underline={props.underline} className={"subtitle-component colorizable " + props.className}>
            <p>{props.title}</p>
        </div>
    );
}



export function Video (props){
    return (
        <iframe className="video-frame" src={URLtoEmbed(props.url)} title={props.url} allowFullScreen={true}/>
    );
}



function URLtoEmbed(url){
    var startIndex = url.search("v=");
    if(startIndex === -1) return "https://www.youtube-nocookie.com/embed/" + url;

    return "https://www.youtube-nocookie.com/embed/" + url.substring(startIndex + 2);
}



//get scroll position
/*const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        console.log(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);*/