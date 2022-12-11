import { Title } from "../Components.js";
import { lineToHtml, LoadJSON } from "../DataHandler.js";

export default function Homepage(){
    document.title = "FBG Bremen";

    let glaubensbekenntnis = LoadJSON("Data/glaubensbekenntnis.json");
    if(glaubensbekenntnis === undefined) return;

    return (
        <div id="glaubensbekenntnis">
            <Title title="Glaubensbekenntnis"/>
            <div className="shell">
                {glaubensbekenntnis.categories.map((cat) => { return <Category cat={cat} key={cat.title}/> })}
            </div>
        </div>
    );
}

function Category(props){
    return(
        <div className="category">
            <CatTitle title={props.cat.title}/>
            <CatContent content={props.cat.content}/>
            <CatVerses verses={props.cat.verses}/>
        </div>
    );
}

function CatTitle(props){
    return(
        <h1 className="title">{props.title}</h1>
    );
}
function CatContent(props){
    return (
        <p className="content">{lineToHtml(props.content)}</p>
    );
}
function CatVerses(props){
    return (
        <div className="verses-collection">
            {props.verses.map((verse) => { return <p className="verse" key={verse}>{verse + ";"}</p> })}
        </div>
    );
}