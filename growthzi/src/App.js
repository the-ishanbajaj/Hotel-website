import React from 'react';
import BookingSection from './components/BookingSection';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LuxuryRooms from './components/LuxuryRooms';
import ExtraServices from './components/ExtraServices';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomDetailsPage from './components/RoomDetailsPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <BookingSection />
              <LuxuryRooms />
              <ExtraServices />
              <Amenities />
              <Footer />
            </>
          } />
          <Route path="/room-details" element={<RoomDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
