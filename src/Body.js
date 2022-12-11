import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import { LoadJSON, strRemoveUmlauts } from './DataHandler';

import Homepage from './Pages/Homepage';

import Gottesdienste from './Pages/Gottesdienste';
import Glaubensbekenntnis from './Pages/Glaubensbekenntnis';

import Veranstaltungen from './Pages/Veranstaltungen';

import Predigten from './Pages/Predigten';
import Predigtreihe from './Pages/Predigtreihe';
import Themen from './Pages/Themen';

import Kontakt from './Pages/Kontakt';

import Impressum from './Pages/Impressum';
import Datenschutz from './Pages/Datenschutz';

export default function Body(){
  let playlists = LoadJSON("Data/playlists.json");

  return (
    <div className="body">
      <ScrollToTop>
        <Routes>
          <Route exact path='/' element={<Homepage/>}></Route>

          <Route exact path='/gottesdienste' element={<Gottesdienste lan="ger"/>}></Route>
          <Route exact path='/russian' element={<Gottesdienste lan="rus"/>}></Route>
          <Route exact path='/glaubensbekenntnis' element={<Glaubensbekenntnis/>}></Route>

          <Route exact path='/veranstaltungen' element={<Veranstaltungen/>}></Route>

          <Route exact path='/aktuelle-predigten' element={<Predigten/>}></Route>
          <Route exact path='/predigtreihen' element={<Themen/>}></Route>

          <Route exact path='/kontakt' element={<Kontakt/>}></Route>

          <Route exact path='/impressum' element={<Impressum/>}></Route>
          <Route exact path='/datenschutz' element={<Datenschutz/>}></Route>

          {playlists !== undefined && playlists.list.map((playlist) => {
            return <Route exact path={'/predigtreihen/' + (playlist.urlExtension === undefined ? strRemoveUmlauts(playlist.theme.toLowerCase()) : playlist.urlExtension)} element={<Predigtreihe playlist={playlist}/>} key={playlist.theme}/>
          })}
        </Routes>
      </ScrollToTop>
    </div>
  );
}

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};