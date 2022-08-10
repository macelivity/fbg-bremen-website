import "./CSS/Main.css";

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
