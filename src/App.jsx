import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import DataPelanggaran from './pages/DataPelanggaran';
import Pengaduan from './pages/Pengaduan';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DataFoto from './pages/DataFoto';
import DataVideo from './pages/DataVideo';
import DataPengaduan from './pages/DataPengaduan';
import LoginAdmin from './pages/Login';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/DataPelanggaran' element={<DataPelanggaran/>}/>
        <Route path='/Pengaduan' element={<Pengaduan/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/DataFoto' element={<DataFoto/>}/>
        <Route path='/DataVideo' element={<DataVideo/>}/>
        <Route path='/DataPengaduan' element={<DataPengaduan/>}/>
        <Route path='/LoginAdmin' element={<LoginAdmin/>}/>

      </Routes>
    </Router>
  )
}

export default App
