import $ from 'jquery';
import { useState, useEffect } from 'react';

export function LoadJSON(path){
  const [data, setData] = useState();

  useEffect(() => {
      getJSON(process.env.PUBLIC_URL + "/" + path).then(function(content) { setData(content); });
  }, [path]);

  return data;
}

function getJSON(path){
    return $.getJSON(path, function(result) {
        return result;
    });
}


export function lineToHtml(line){
    let content = [""];
    let chars = [...line];
    
    for(let i = 0; i < chars.length; i++){
        if(chars[i] === '\n') {
            content.push(<br key={i}/>);
            content.push("");
        }
        else content[content.length - 1] += chars[i];
    }

    return content;
}
function lineToLink(line){
    line = line.slice(6);
    let [url, text] = line.split("<txt>");
    return <a href={url} target="_blank" rel="noreferrer" key={url}>{text}</a>
}

export function strArrayToText(strArray, spacer = ""){
    if(strArray === undefined) return <></>;
    
    return strArray.map((line) => {
        if(line.slice(0, 6) === "<link>") return lineToLink(line);
        return lineToHtml(line);
    })
}

export function strRemoveUmlauts(str){
    str = str.replace(/\u00c4/g, "Ae");
    str = str.replace(/\u00e4/g, "ae");
    str = str.replace(/\u00d6/g, "Oe");
    str = str.replace(/\u00f6/g, "oe");
    str = str.replace(/\u00dc/g, "Ue");
    str = str.replace(/\u00fc/g, "ue");
    str = str.replace(/\u00df/g, "ss");
    return str;
}


export function useGetLatestVideos(){
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

    return videos;
}