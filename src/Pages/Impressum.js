import { Title } from "../Components.js";
import './CSS/Neuigkeiten.css';

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
            <p>Technikprobleme können sie gerne bei Christian Zahn melden:</p>
            <p>[Insert E-Mail Adresse here]</p>
        </>
    );
}