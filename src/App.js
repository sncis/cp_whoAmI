import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage"
import { DataStateProvider } from './store/dataContext'
import CanvasPage from "./pages/CanvasPage"
import AboutPage from './pages/AboutPage'


function App() {
  return (
    <div className="App">
      <DataStateProvider>
        <BrowserRouter>
        <Routes> 
          <Route path='/' element={<HomePage />} />
          <Route path='/sketch' element={<CanvasPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        </BrowserRouter>
      </DataStateProvider>
    </div>
  );
}

export default App;
