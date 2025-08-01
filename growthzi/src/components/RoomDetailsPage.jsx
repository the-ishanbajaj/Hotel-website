import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/RoomDetailsPage.css';

const RoomDetailsPage = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  
  //.... Sample room data - in real app this would come from props/routing./././...........
  const roomData = {
    title: "Superior Suite",
    price: 435,
    images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
    description: "Experience luxury in our Superior Suite featuring elegant furnishings, modern amenities, and stunning city views. Perfect for both business and leisure travelers.",
    amenities: [
      { icon: "👥", label: "2 Guests", desc: "Comfortable for 2 people" },
      { icon: "📏", label: "35 Sqm", desc: "Spacious room layout" },
      { icon: "🚿", label: "1 Bathroom", desc: "Private bathroom with luxury fixtures" },
      { icon: "🏙️", label: "City View", desc: "Beautiful panoramic city views" },
      { icon: "📶", label: "Free WiFi", desc: "High-speed internet access" },
      { icon: "❄️", label: "Air Conditioning", desc: "Climate control system" }
    ],
    features: [
      "King size bed with premium linens",
      "Work desk with ergonomic chair", 
      "Mini bar and coffee maker",
      "Flat-screen TV with cable channels",
      "Safety deposit box",
      "24/7 room service available"
    ]
  };

  const bookRoom = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    alert(`Room booked! Check-in: ${checkInDate}, Check-out: ${checkOutDate}, Guests: ${guestCount}`);
  };

  return (
    <div className="roomPageWrapper">
      <Header />
      
      <main className="roomDetailsMain">
        <div className="roomContainer">
          
          {/* Room Images Section */}
          <section className="imgSection">
            <div className="mainImgBox">
              <img src={roomData.images[0]} alt="Room main view" className="roomMainImg" />
            </div>
            <div className="thumbRow">
              {roomData.images.map((img, idx) => (
                <div key={idx} className="thumbBox">
                  <img src={img} alt={`Room view ${idx + 1}`} className="thumbImg" />
                </div>
              ))}
            </div>
          </section>

          {/* Room Info & Booking */}
          <div className="roomInfoRow">
            
            {/* Room Details */}
            <div className="roomInfoCol">
              <div className="roomTitleBlock">
                <h1 className="roomMainTitle">{roomData.title}</h1>
                <div className="priceTag">
                  <span className="priceNum">${roomData.price}</span>
                  <span className="pricePer">/ night</span>
                </div>
              </div>

              <div className="roomDesc">
                <p>{roomData.description}</p>
              </div>

              {/* Room Amenities */}
              <div className="amenitiesBlock">
                <h3 className="amenitiesHead">Room Amenities</h3>
                <div className="amenitiesGrid">
                  {roomData.amenities.map((item, i) => (
                    <div key={i} className="amenityBox">
                      <span className="amenityIc">{item.icon}</span>
                      <div className="amenityTxt">
                        <span className="amenityName">{item.label}</span>
                        <span className="amenityDesc">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Features */}
              <div className="featuresBlock">
                <h3 className="featuresHead">Room Features</h3>
                <ul className="featuresList">
                  {roomData.features.map((feature, idx) => (
                    <li key={idx} className="featureItem">
                      <span className="featureBullet">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bookingCol">
              <div className="bookingCard">
                <h3 className="bookCardHead">Reserve This Room</h3>
                
                <div className="bookingForm">
                  <div className="dateRow">
                    <div className="dateGroup">
                      <label className="dateLabel">Check In</label>
                      <input 
                        type="date" 
                        className="dateInp"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                      />
                    </div>
                    <div className="dateGroup">
                      <label className="dateLabel">Check Out</label>
                      <input 
                        type="date" 
                        className="dateInp"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="guestGroup">
                    <label className="dateLabel">Guests</label>
                    <select 
                      className="guestSelect"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                    </select>
                  </div>

                  <div className="totalBlock">
                    <div className="totalRow">
                      <span>Room Rate</span>
                      <span>${roomData.price}/night</span>
                    </div>
                    <div className="totalRow finalTotal">
                      <span>Total</span>
                      <span>${roomData.price}</span>
                    </div>
                  </div>

                  <button className="bookNowBtn" onClick={bookRoom}>
                    Book Now
                  </button>
                  
                  <p className="bookNote">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoomDetailsPage;
