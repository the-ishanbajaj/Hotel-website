import React, { useState } from 'react';
import '../styles/LuxuryRooms.css';
import { useNavigate } from 'react-router-dom';

const LuxuryRooms = () => {
  // State to handle inline title editing
  const [isEditingTitle, setEditingTitle] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('Luxury Rooms & Suites');
  const [editableTitle, setEditableTitle] = useState(sectionTitle);

  const navigate = useNavigate();

  // Rooms state and new room form state
  const [roomsList, setRoomsList] = useState([
    {
      id: 1,
      title: 'Superior Suite',
      image: '/api/placeholder/300/200',
      amenities: ['2 Guests', '35 Sqm', '1 Bathroom', 'City View'],
      description: 'Elegant suite with modern amenities and stunning city views'
    },
    {
      id: 2,
      title: 'Deluxe Room',
      image: '/api/placeholder/300/200',
      amenities: ['2 Guests', '28 Sqm', '1 Bathroom', 'Garden View'],
      description: 'Comfortable room with beautiful garden views and luxury finishes'
    },
    {
      id: 3,
      title: 'Presidential Suite',
      image: '/api/placeholder/300/200',
      amenities: ['4 Guests', '65 Sqm', '2 Bathrooms', 'Ocean View'],
      description: 'Luxurious presidential suite with panoramic ocean views'
    }
  ]);

  const [showAddRoomForm, setShowAddRoomForm] = useState(false);

  const [newRoomData, setNewRoomData] = useState({
    title: '',
    amenities: ['', '', '', ''],
    description: ''
  });

  // Handlers for editing section title
  const startEditTitle = () => {
    setEditingTitle(true);
    setEditableTitle(sectionTitle);
  };

  const cancelEditTitle = () => {
    setEditingTitle(false);
    setEditableTitle(sectionTitle);
  };

  const saveTitleEdit = async () => {
    setSectionTitle(editableTitle);
    setEditingTitle(false);

    try {
      // Post edit to Flask API
      const res = await fetch('http://localhost:5000/update-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          component: 'LuxuryRooms',
          field: 'sectionTitle',
          value: editableTitle
        }),
      });
      if (res.ok) {
        console.log('Section title saved.');
      }
    } catch (error) {
      console.error('Error saving section title:', error);
    }
  };

  // Adding a new room handlers
  const openAddRoomForm = () => setShowAddRoomForm(true);
  const cancelAddRoomForm = () => {
    setShowAddRoomForm(false);
    setNewRoomData({ title: '', amenities: ['', '', '', ''], description: '' });
  };

  const saveNewRoom = () => {
    if (newRoomData.title && newRoomData.description) {
      const filteredAmenities = newRoomData.amenities.filter((a) => a.trim() !== '');
      const newRoom = {
        id: roomsList.length + 1,
        title: newRoomData.title,
        image: '/api/placeholder/300/200',
        amenities: filteredAmenities,
        description: newRoomData.description,
      };
      setRoomsList([...roomsList, newRoom]);
      cancelAddRoomForm();
    }
  };

  //       Form input chang handler for new room 
  const handleNewRoomChange = (field, value, index = null) => {
    if (field === 'amenities' && index !== null) {
      const updatedAmenities = [...newRoomData.amenities];
      updatedAmenities[index] = value;
      setNewRoomData({ ...newRoomData, amenities: updatedAmenities });
    } else {
      setNewRoomData({ ...newRoomData, [field]: value });
    }
  };

  return (
    <section className="luxRoomsSection">
      <div className="wrapContainer">

        <div className="headerRow">
          <div className="headerTitleWrapper">
            {isEditingTitle ? (
              <div className="titleEditContainer">
                <input
                  type="text"
                  className="titleEditInput"
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                />
                <div className="editBtnsGroup">
                  <button className="btnSave" onClick={saveTitleEdit}>Save</button>
                  <button className="btnCancel" onClick={cancelEditTitle}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="sectionTitle">{sectionTitle}</h2>
                <button className="btnEdit" onClick={startEditTitle}>Edit</button>
              </>
            )}
          </div>
          <button className="btnAddRoom" onClick={openAddRoomForm}>+ Add Room</button>
        </div>

        <div className="roomsGrid">
          {roomsList.map((room) => (
            <article key={room.id} className="roomCard">
              <div className="roomImgWrapper">
                <img src={room.image} alt={`${room.title} image`} />
              </div>
              <div className="roomDetails">
                <h3 className="roomTitle">{room.title}</h3>
                <div className="amenitiesList">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenityItem">
                      <span className="amenityIcon">•</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                <p className="roomDesc">{room.description}</p>
                <button 
  className="btnBookNow" 
  onClick={() => navigate('/room-details')}
>
  Book Now
</button>
              </div>
            </article>
          ))}
        </div>

        {showAddRoomForm && (
          <div className="modalOverlay">
            <div className="modalContent">
              <header className="modalHeader">
                <h3>Add New Room</h3>
                <button className="closeModalBtn" onClick={cancelAddRoomForm} aria-label="Close Modal">&times;</button>
              </header>
              <section className="modalBody">
                <label className="formLabel">Room Title</label>
                <input
                  type="text"
                  className="formInput"
                  value={newRoomData.title}
                  onChange={(e) => handleNewRoomChange('title', e.target.value)}
                  placeholder="Enter room title"
                />

                <label className="formLabel">Amenities</label>
                {newRoomData.amenities.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    className="formInput amenityInput"
                    value={item}
                    onChange={(e) => handleNewRoomChange('amenities', e.target.value, index)}
                    placeholder={`Amenity ${index + 1}`}
                  />
                ))}

                <label className="formLabel">Description</label>
                <textarea
                  className="formTextArea"
                  rows={3}
                  value={newRoomData.description}
                  onChange={(e) => handleNewRoomChange('description', e.target.value)}
                  placeholder="Enter room description"
                />
              </section>
              <footer className="modalFooter">
                <button className="btnSaveRoom" onClick={saveNewRoom}>Add Room</button>
                <button className="btnCancelRoom" onClick={cancelAddRoomForm}>Cancel</button>
              </footer>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default LuxuryRooms;
