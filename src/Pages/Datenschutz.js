

import { Title, SubTitle } from '../Components';
import { LoadJSON, strArrayToText } from '../DataHandler';

import './CSS/Datenschutz.css';

export default function Datenschutz(){
    let data = LoadJSON("Data/datenschutz.json");
    if(data === undefined) return;

    return(
        <>
            <Title title="Datenschutz"/>
            
            {data.paragraphs.map((paragraph) => {
                return <Paragraph title={paragraph.title} key={paragraph.title}>{strArrayToText(paragraph.content)}</Paragraph>
            })}
        </>
    );
}

function Paragraph(props){
    return (
        <>
            <SubTitle title={props.title}/>
            <p className="paragraph-text">{props.children}</p>
        </>
    );
}