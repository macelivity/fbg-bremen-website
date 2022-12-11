import { Link } from "react-router-dom";
import './CSS/Footer.css';


export default function Footer(){
    return(
        <footer className="footer">
            <FooterImgBtn imgSrc="Icons/YouTube_icon_simple.png" alt="YouTubeLink_Icon"/>
            <FooterBtn title="Impressum" link="/impressum"/>
        </footer>
    );
}



function FooterBtn(params){
    return(
        <Link className="btn-shell" to={params.link}>
            <button className="btn">{params.title}</button>
        </Link>
    );
}

function FooterImgBtn(params){
    return(
        <a className="btn-shell" href="https://www.youtube.com/channel/UChUaD69cuuTJSUuu_fHJgFQ">
            <img className="img-btn" src={process.env.PUBLIC_URL + "/" + params.imgSrc} alt={params.alt}/>
        </a>
    );
}