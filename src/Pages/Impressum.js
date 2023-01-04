import { Link } from "react-router-dom";
import { Title } from "../Components.js";

export default function Impressum(){
    document.title = "FBG Bremen - Impressum";

    return (
        <>
            <Title title="Impressum"/>
            
            <p>Zum Beispiel:</p>
            <br/>
            <p>Freikirchliche Baptistengemeinde Bremen e. V.</p>
            <p>Uphuser Heerstraße, 102</p>
            <p>28832 Achim</p>
            <br/>
            <p>Technikprobleme können sie gerne über das Kontaktformular melden:</p>
            <Link to="/kontakt">
                <button>Zum Kontaktformular</button>
            </Link>
        </>
    );
}