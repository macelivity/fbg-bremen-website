import "./CSS/Main.css";

import "./CSS/Body.css";

import './CSS/Pages/Datenschutz.css';
import './CSS/Pages/Glaubensbekenntnis.css';
import './CSS/Pages/Gottesdienste.css';
import './CSS/Pages/Homepage.css';
import './CSS/Pages/Impressum.css';
import './CSS/Pages/Kontakt.css';
import './CSS/Pages/Predigten.css';
import './CSS/Pages/Predigtreihe.css';
import './CSS/Pages/Themen.css';
import './CSS/Pages/Veranstaltungen.css';

import './CSS/Components/StylingComponents.css'
import './CSS/Components/Zeitplan.css';

import Navbar from "./Navbar.js";
import Footer from './Footer';
import Body from './Body';

export default function App() {
  //const [cookieConsent, setCookieConsent] = useState(localStorage.getItem('cookieConsent'));
  //{cookieConsent === null && <CookieBanner setCookieConsent={(val) => { setCookieConsent(val) }}/>}

  return (
    <>
      <Navbar/>
      <Body/>
      <Footer/>
    </>
  );
}
