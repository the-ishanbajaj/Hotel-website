import React from 'react';
import '../styles/Amenities.css';

const amenitiesList = [
  { title: "Free WiFi", description: "High-speed internet access throughout the property", icon: require('../assets/icons/wifi.svg').default },
  { title: "Swimming Pool", description: "Outdoor pool with stunning city views", icon: require('../assets/icons/pool.svg').default },
  { title: "Fitness Center", description: "24/7 access to modern fitness equipment", icon: require('../assets/icons/gym.svg').default },
  { title: "Restaurant", description: "Fine dining with international cuisine", icon: require('../assets/icons/restaurant.svg').default },
  // { title: "Parking", description: "Complimentary valet parking service", icon: require('../assets/icons/parking.svg').default },
  { title: "Concierge", description: "24/7 concierge service for your needs", icon: require('../assets/icons/concierge.svg').default },
  { title: "Business Center", description: "Business facilities for meetings and work", icon: require('../assets/icons/business.svg').default },
  { title: "Airport Shuttle", description: "Seamless airport transfers for guests", icon: require('../assets/icons/shuttle.svg').default }
];

function Amenities() {
  return (
    <section className="amSecRoot">
      <div className="amHeaderBlock">
        <span className="amMinorTitle">Our Premium Services</span>
        <h2 className="amHead">Amenities</h2>
        <div className="amHeadDivider"></div>
        <p className="amLeadTxt">
          Experience a curated selection of comforts and luxuries for a memorable stay.
        </p>
      </div>
      <div className="amGridMain">
        {amenitiesList.map((itm, idx) => (
          <div className="amGridCard" key={idx}>
            <div className="amIconCont"><img src={itm.icon} alt={itm.title + " icon"} /></div>
            <div className="amDetBlock">
              <div className="amTitle">{itm.title}</div>
              <div className="amDesc">{itm.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Amenities;
