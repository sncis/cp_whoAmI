import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./pages/HomePage"
import { DataStateProvider } from './store/dataContext'
import CanvasPage from "./pages/CanvasPage"
import InfoPage from './pages/InfoPage'


function App() {
  return (
    <div className="App">
      <DataStateProvider>
        <BrowserRouter>
        <Routes> 
          {/* <Route path='/' element={<HomeComp />} /> */}
          <Route path='/' element={<HomePage />} />
          <Route path='/sketch' element={<CanvasPage />} />
          <Route path='/about' element={<InfoPage />} />
        </Routes>
        </BrowserRouter>
      </DataStateProvider>
    </div>
  );
}

export default App;
