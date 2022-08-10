import { Routes, Route } from 'react-router-dom';
import './CSS/Main.css'

import { LoadJSON, strRemoveUmlauts } from './DataHandler';

import Homepage from './Pages/Homepage';

import Gottesdienste from './Pages/Gottesdienste';
import Glaubensbekenntnis from './Pages/Glaubensbekenntnis';

import Neuigkeiten from './Pages/Neuigkeiten';

import Predigten from './Pages/Predigten';
import Predigtreihe from './Pages/Predigtreihe';
import Themen from './Pages/Themen';

import Kontakt from './Pages/Kontakt';

import Impressum from './Pages/Impressum';
import Datenschutz from './Pages/Datenschutz';

export default function Body(){
  let playlists = LoadJSON("Data/playlists.json");

  console.log("Start routing");
  console.log(playlists);

  return (
    <div className="content">
      <Routes>
        <Route exact path='/' element={<Homepage/>}></Route>

        <Route exact path='/gottesdienste' element={<Gottesdienste lan="ger"/>}></Route>
        <Route exact path='/russian' element={<Gottesdienste lan="rus"/>}></Route>
        <Route exact path='/glaubensbekenntnis' element={<Glaubensbekenntnis/>}></Route>

        <Route exact path='/neuigkeiten' element={<Neuigkeiten/>}></Route>

        <Route exact path='/aktuelle-predigten' element={<Predigten/>}></Route>
        <Route exact path='/predigtreihen' element={<Themen/>}></Route>

        <Route exact path='/kontakt' element={<Kontakt/>}></Route>

        <Route exact path='/impressum' element={<Impressum/>}></Route>
        <Route exact path='/datenschutz' element={<Datenschutz/>}></Route>

        {playlists !== undefined && playlists.list.map((playlist) => { 
          console.log('/predigtreihen/' + (playlist.urlExtension === undefined ? strRemoveUmlauts(playlist.theme.toLowerCase()) : playlist.urlExtension));
          return <Route exact path={'/predigtreihen/' + (playlist.urlExtension === undefined ? strRemoveUmlauts(playlist.theme.toLowerCase()) : playlist.urlExtension)} element={<Predigtreihe playlist={playlist}/>} key={playlist.theme}/>
        })}
      </Routes>
    </div>
  );
}