import { useState } from "react";
import emailjs from "emailjs-com";

import { Title } from "../Components.js";
import { LoadJSON } from "../DataHandler.js";

export default function Kontakt(){
    document.title = "FBG Bremen - Kontakt";

    let contactData = LoadJSON("Data/kontaktdaten.json");
    if(contactData === undefined) return;

    return (
        <div id="kontakt">
            <Title title="Kontakt"/>
            
            <Form/>
        </div>
    );
}

var data = {
    addressee: "unbestimmt",
    name: "",
    reply_to: "",
    subject: "",
    message: ""
}
var setData = null;

function Form(){
    [data, setData] = useState(
        JSON.parse(localStorage.getItem('kontakt-data')) || {
            addressee: "unbestimmt",
            name: "",
            reply_to: "",
            subject: "",
            message: ""
        }
    );


    return(
        <form className="form" onSubmit={SendEmail}>
            
            <Addressee/>
            <Name/>
            <Sender/>
            <Subject/>
            <Message/>
            
            <input type="submit" className="submit" value="Nachricht senden"/>
        </form>
    );
}

function Addressee(){
    return(
        <>
            <label htmlFor="addressat-dropdown">Addressat:</label>

            <select id="addressat-dropdown" className="addressee" name="addressee" value={data.addressee} onChange={HandleInputChange}>
                <option value="unbestimmt">Unbestimmt</option>
                <option value="vorstand">Vorstand</option>
                <option value="aelteste">Älteste</option>
                <option value="technik">Technik</option>
            </select>
        </>
    );
}

function Name(){
    return(
        <>
            <label htmlFor="name-inp">Name:</label>

            <input type="text" id="name-inp" className="name" placeholder="Name..." name="name" value={data.name} onChange={HandleInputChange}></input>
        </>
    );
}

function Sender(){
    return(
        <>
            <label htmlFor="sender-inp">E-Mail:</label>

            <input type="email" id="sender-inp" className="sender" required placeholder="IhreEmail@adresse.de" name="reply_to" value={data.reply_to} onChange={HandleInputChange}></input>
        </>
    );
}

function Subject(){
    return(
        <>
            <label htmlFor="subject-inp">Betreff:</label>

            <input type="text" id="subject-inp" className="subject" placeholder="Thema..." name="subject" value={data.subject} onChange={HandleInputChange}></input>
        </>
    )
}

function Message(){
    return(
        <>
            <label htmlFor="message-inp">Nachricht:</label>

            <textarea type="text" id="message-inp" className="message" required placeholder="Lieber..." name="message" value={data.message} onChange={HandleInputChange}></textarea>
        </>
    )
}



function HandleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setData({
        ...data,
        [name]: value
    });

    localStorage.setItem('kontakt-data', JSON.stringify({
        ...data,
        [name]: value
    }));
}


function SendEmail(event) {
    event.preventDefault();
    emailjs.sendForm('service_ycfm4qb', 'template_0f2igit', event.target, 'rQg4LpZdzrIPTr3nz')
      .then((result) => {
          console.log(result.text);
      });
  }