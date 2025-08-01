import React, { useState } from 'react';
import '../styles/BookingSection.css';

const BookingSection = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomCount, setRoomCount] = useState('1 Room');

  const submitBookingForm = (e) => {
    e.preventDefault();
    alert('Booking availability check initiated!');
  };

  return (
    <section className="booking-sec">
      <div className="booking-wrap">
        <form className="book-form" onSubmit={submitBookingForm}>
          <div className="form-group-row">
            <div className="input-holder">
              <label htmlFor="checkIn" className="input-label">Check In</label>
              <input
                id="checkIn"
                type="date"
                className="input-field"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                required
              />
            </div>
            <div className="input-holder">
              <label htmlFor="checkOut" className="input-label">Check Out</label>
              <input
                id="checkOut"
                type="date"
                className="input-field"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                required
              />
            </div>
            <div className="input-holder">
              <label htmlFor="rooms" className="input-label">Rooms</label>
              <select
                id="rooms"
                className="select-field"
                value={roomCount}
                onChange={(e) => setRoomCount(e.target.value)}
              >
                <option>1 Room</option>
                <option>2 Rooms</option>
                <option>3 Rooms</option>
                <option>4 Rooms</option>
                <option>5 Rooms</option>
                <option>6 Rooms</option>
              </select>
            </div>
            <div className="btn-holder">
              <button type="submit" className="submit-btn">Check Availability</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
