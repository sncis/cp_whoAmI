import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeComp from './components/HomeComp'
import CanvasComp from './components/CanvasComp'




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes> 
        <Route exact path='/' element={<HomeComp />} />
        <Route path='/sketch' element={<CanvasComp/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
