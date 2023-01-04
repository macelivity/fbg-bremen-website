import { Title, Video } from '../Components';
import { useGetLatestVideos } from '../DataHandler';

export default function Predigten(){
    document.title = "FBG Bremen - Aktuelle Predigten";

    return (
        <div id="predigten">
            <Title title="Predigten"/>
            
            <div className="content-field">
                <LatestVideos/>
                <LiveLinksText/>
                <YoutubeChannel/>
            </div>
        </div>
    );
}

function LatestVideos(){
    let videos = useGetLatestVideos();
    if(videos === undefined) return <p>Loading latest Videos... Please be patient</p>;

    return (
        <div className="videos-panel">
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
        <div className="entry">
            <div className="container">
                <Video url={props.url}/>
            </div>
            <h3 className="title">{props.title}</h3>
        </div>
    );
}


function LiveLinksText(props){
    return(
        <div className="liveLinksText">
            <p className="text">Unsere Gottesdienste werden auch Live ausgestrahlt jedoch nicht öffentlich. Wenn sie Zugang erhalten wollen, melden sie sich bitte vor Ort bei der Technik.</p>
        </div>
    )
}

function YoutubeChannel(){
    return(
        <div className="yt-channel">
            <p>Zum YouTube-Kanal:</p>
            <a href="https://www.youtube.com/channel/UChUaD69cuuTJSUuu_fHJgFQ">
                <img src={"Icons/YouTube/Youtube.svg"} alt={"YouTube icon"}/>
            </a>
        </div>
    );
}
