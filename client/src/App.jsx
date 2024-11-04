import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar';
import './styles/app.scss';
import Canvas from './components/Canvas';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/:id' element={
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          } />
          <Route path='/' element={
            <><Toolbar />
              <SettingBar />
              <Canvas />
              <Navigate to={`/f${(+new Date()).toString(16)}`} replace />
            </>}
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
