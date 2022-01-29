import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeComp from './components/HomeComp'
import CanvasComp from './components/CanvasComp'
import { DataStateProvider } from './store/dataContext'



function App() {
  return (
    <div className="App">
      <DataStateProvider>
        <BrowserRouter>
        <Routes> 
          <Route exact path='/' element={<HomeComp />} />
          <Route path='/sketch' element={<CanvasComp/>} />
        </Routes>
        </BrowserRouter>
      </DataStateProvider>
    </div>
  );
}

export default App;
