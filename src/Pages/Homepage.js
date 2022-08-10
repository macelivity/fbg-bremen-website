import { Link } from "react-router-dom";

import { Title } from "../Components.js";
import "./CSS/Homepage.css";

export default function Homepage(){
    document.title = "FBG Bremen";

    return (
        <>
            <Title title="FBG-Bremen"/>
            <div className="body">
                <WelcomeText/>
                <div className="pagePreview-panel">
                    <PagePreview title="Gottesdienste" link="/gottesdienste"/>
                    <PagePreview title="Neuigkeiten" link="/neuigkeiten"/>
                    <PagePreview title="Predigten" link="/predigten"/>
                    <PagePreview title="Kontakt" link="/kontakt"/>
                </div>
            </div>
        </>
    );
}

function WelcomeText(props){
    return(
        <div>
            <p>Willkommen auf der Webseite der FBG-Bremen. Hier können sie mehr über die Gemeinde erfahren, wann und wo ihre Gottesdienste stattfinden und auch zukünftige Ereignisse, die wir planen. Außerdem können sie sich Predigten anschauen und, wenn sie fragen haben, gerne auch jemanden von uns kontaktieren.</p>
        </div>
    );
}

function PagePreview(props){
    return(
        <Link to={props.link} className="pagePreview">
            <button className="pagePreview-btn">
                <h3>{props.title}</h3>
            </button>
        </Link>
    );
}