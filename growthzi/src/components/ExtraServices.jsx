import React, { useState } from 'react';
import '../styles/ExtraServices.css';

const ExtraServices = () => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [headerText, setHeaderText] = useState('Extra Services');
  const [tmpHeader, setTmpHeader] = useState(headerText);
  const [addingService, setAddingService] = useState(false);

 
  const [svcList, setSvcList] = useState([
    {
      id: 1,
      title: 'Room Service',
      icon: '🛎️',
      description: '24/7 room service available for all your dining needs with premium quality meals.',
      features: ['24/7 Available', 'Premium Quality', 'Fast Delivery']
    },
    {
      id: 2,
      title: 'Laundry Service',
      icon: '🧺',
      description: 'Professional laundry and dry cleaning services with same-day delivery.',
      features: ['Same Day Service', 'Professional Care', 'Eco-Friendly']
    },
    {
      id: 3,
      title: 'Spa & Wellness',
      icon: '💆',
      description: 'Relax and rejuvenate with our world-class spa and wellness treatments.',
      features: ['Expert Therapists', 'Luxury Treatments', 'Relaxing Environment']
    }
  ]);

  const [newSvc, setNewSvc] = useState({
    title: '',
    icon: '',
    description: '',
    features: ['', '', '']
  });

  const editHandler = () => {
    setEditingTitle(true);
    setTmpHeader(headerText);
  };

  async function saveHeader() {
    setHeaderText(tmpHeader);
    setEditingTitle(false);
    try {
      await fetch('http://localhost:5000/update-section', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          component: 'ExtraServices',
          field: 'sectionTitle',
          value: tmpHeader
        })
      });
    } catch (e) {
      
      console.log('save extra svc title failed:', e);
    }
  }

  const cancelHeaderEdit = () => {
    setEditingTitle(false);
    setTmpHeader(headerText);
  };

  const openAddForm = () => setAddingService(true);
  const closeAddForm = () => {
    setAddingService(false);
    setNewSvc({ title: '', icon: '', description: '', features: ['', '', ''] });
  };

  function saveService() {
    if (newSvc.title && newSvc.description) {
      const added = {
        id: svcList.length + 1,
        ...newSvc,
        icon: newSvc.icon || '⭐',
        features: newSvc.features.filter(f => !!f.trim())
      };
      setSvcList([...svcList, added]);
      closeAddForm();
    }
  }

  function serviceChange(field, value, idx = null) {
    if (field === 'features' && idx !== null) {
      let tmp = [...newSvc.features];
      tmp[idx] = value;
      setNewSvc({ ...newSvc, features: tmp });
    } else {
      setNewSvc({ ...newSvc, [field]: value });
    }
  }

  return (
    <section className="extraSvsBlock">
      <div className="svcWrap">
        <div className="svcHeaderRow">
          <div className="hdrEditFlex">
            {editingTitle ? (
              <div className="inlineTitleEdit">
                <input
                  type="text"
                  value={tmpHeader}
                  className="titleInput"
                  onChange={e => setTmpHeader(e.target.value)}
                />
                <span className="btnGrpEdit">
                  <button className="okBtn" onClick={saveHeader}>Save</button>
                  <button className="closeBtn" onClick={cancelHeaderEdit}>Cancel</button>
                </span>
              </div>
            ) : (
              <>
                <h2 className="extraSvsHeading">{headerText}</h2>
                <button className="titleEditBtn" onClick={editHandler}>Edit</button>
              </>
            )}
          </div>
          <button className="plusSvcBtn" onClick={openAddForm}>+ Add Service</button>
        </div>

        <main className="svcGrid">
          {svcList.map(item => (
            <div key={item.id} className="svcBlk">
              <div className="svc-icBox">
                <span className="icBig">{item.icon}</span>
              </div>
              <div className="svcContent">
                <div className="svcTitle">{item.title}</div>
                <p className="svcDesc">{item.description}</p>
                <div className="svcFeatures">
                  {item.features.map((feat, i) => (
                    <div className="featRow" key={i}>
                      <span className="tickB">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <button className="seeMoreBtn">Learn More</button>
              </div>
            </div>
          ))}
        </main>

        {addingService && (
          <div className="svcModalOverlay">
            <div className="svcModal">
              <div className="svcModalHd">
                <h3>Add New Service</h3>
                <button onClick={closeAddForm} className="svcCloseX" aria-label="close">×</button>
              </div>
              <div className="svcModalBody">
                <div className="inptGrp">
                  <label>Service Title</label>
                  <input type="text" value={newSvc.title}
                    onChange={e => serviceChange('title', e.target.value)}
                    className="svcField" placeholder="Enter service title" />
                </div>
                <div className="inptGrp">
                  <label>Service Icon (Emoji)</label>
                  <input type="text" value={newSvc.icon}
                    onChange={e => serviceChange('icon', e.target.value)}
                    className="svcField" placeholder="Enter emoji (e.g. 🎯)" />
                </div>
                <div className="inptGrp">
                  <label>Description</label>
                  <textarea
                    className="svcField"
                    rows={3}
                    value={newSvc.description}
                    onChange={e => serviceChange('description', e.target.value)}
                    placeholder="Describe service"
                  />
                </div>
                <div className="inptGrp">
                  <label>Features</label>
                  {newSvc.features.map((txt, k) => (
                    <input
                      key={k}
                      type="text"
                      value={txt}
                      className="svcField"
                      placeholder={`Feature ${k+1}`}
                      onChange={e => serviceChange('features', e.target.value, k)}
                    />
                  ))}
                </div>
              </div>
              <div className="svcModalAct">
                <button className="svBtn" onClick={saveService}>Add Service</button>
                <button className="cancelBtn" onClick={closeAddForm}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ExtraServices;
