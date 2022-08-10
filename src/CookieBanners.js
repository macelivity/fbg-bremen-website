import { useState } from 'react';
import './CSS/CookieBanner.css';

export default function CookieBanner(props){
    return(
        <div className="banner-shell">
            <p className="banner-text">By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.</p>
            <div className="banner-buttons-shell">
                <BannerButton text="Ablehnen" className="banner-button banner-button-reject" setCookieConsent={props.setCookieConsent}/>
                <BannerButton text="Annehmen" className="banner-button banner-button-accept" setCookieConsent={props.setCookieConsent}/>
            </div>
        </div>
    );
}

function BannerButton(props){
    return(
        <button className={props.className} onClick={() => { localStorage.setItem('cookieConsent', props.text); props.setCookieConsent(props.text); }}>{props.text}</button>
    );
}