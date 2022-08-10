import React,  { useState, useEffect } from 'react';
import { Title, Video } from '../Components';
import './CSS/Predigten.css'

export default function Predigten(){
    document.title = "FBG Bremen - Aktuelle Predigten";

    return (
        <>
            <Title title="Aktuelle Predigten"/>
            <div className="body">
                <LatestVideos/>
                <LiveLinksText/>
                <YoutubeChannel/>
            </div>
        </>
    );
}

function LatestVideos(){
    const [videos, setVideos] = useState([]);
    var channelId = "UChUaD69cuuTJSUuu_fHJgFQ";

    const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D';

    useEffect(() => {
        (async () => {
            if (channelId) {
                try {
                    const data = await fetch(`${baseUrl}${channelId}`).then(response => response.json());
                    setVideos(data.items);
                } catch (error) {
                    console.log(error);
                }
            }
        })();
    }, [channelId]);


    return (
        <div className="videosPanel_predigt">
            {videos.slice(0, 3).map(video => {
                return(
                    <VideoEntry url={video.link} title={video.title} subtitle={video.description} key={video.title}/>
                );
            })}
        </div>
    );
}

function VideoEntry(props){
    return(
        <div className="videoEntry_predigt">
            <div className="videoContainer_predigt">
                <Video url={props.url}/>
            </div>
            <h3 className="videoTitle_predigt">{props.title}</h3>
        </div>
    );
}


function LiveLinksText(props){
    return(
        <div className="liveLinksText-shell">
            <p className="liveLinksText-text">Unsere Gottesdienste werden auch Live über YouTube ausgestrahlt, der Zugang ist jedoch nur über die speziellen Links möglich. Wenn sie die Links zu den Livestreams erhalten wollen, melden sie sich bitte vor Ort bei der Technik.</p>
        </div>
    )
}

function YoutubeChannel(){
    return(
        <a className="yt-channel-panel" href="https://www.youtube.com/channel/UChUaD69cuuTJSUuu_fHJgFQ">
            <img className="yt-channel-fbgIcon" src="Sprites/ToYT-Channel.png" alt="YouTube channel button"/>
        </a>
    );
}
