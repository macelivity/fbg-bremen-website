import { Title } from "../Components.js";
import "./CSS/Kontakt.css";

export default function Kontakt(){
    document.title = "FBG Bremen - Kontakt";

    return (
        <>
            <Title title="Kontakt"/>
            <p>E-Mail: info@fbg-bremen.de</p>
            <p>Bei persönlichen Fragen dürfen sie auch gerne eine der folgenden Personen kontaktieren:</p>
            <p>[Hier Personen einfügen]</p>
        </>
    );
}