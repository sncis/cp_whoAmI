import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeComp from './components/HomeComp'
import CanvasComp from './components/CanvasComp'
import HomePage from "./pages/HomePage"
import { DataStateProvider } from './store/dataContext'
import APIComp from './components/APIComp'



function App() {
  return (
    <div className="App">
      <DataStateProvider>
        <BrowserRouter>
        <Routes> 
          <Route path='/' element={<HomeComp />} />
          <Route path='/sketch' element={<CanvasComp/>} />
          <Route path='/home' element={<HomePage />} />

        </Routes>
        </BrowserRouter>
      </DataStateProvider>
    </div>
  );
}

export default App;
