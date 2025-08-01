import React, { useState } from 'react';
import '../styles/Footer.css';
import twitterIcon from '../assets/icons/twitter.svg';
import facebookIcon from '../assets/icons/facebook.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import gmailIcon from '../assets/icons/gmail.svg';

const Footer = () => {
  const [editContact, setEditContact] = useState(false);
  const [editLinks, setEditLinks] = useState(false);
  const [ct, setCt] = useState({
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    email: 'info@imperial-hotel.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Street, Hotel District, City 12345'
  });
  const [ctTmp, setCtTmp] = useState(ct);
  const [lnk, setLnk] = useState([
    { id: 1, title: 'HOME', url: '#home' },
    { id: 2, title: 'ABOUT', url: '#about' },
    { id: 3, title: 'SERVICE', url: '#service' },
    { id: 4, title: 'ROOM', url: '#room' }
  ]);
  const [lnkTmp, setLnkTmp] = useState(lnk);
  const [subEmail, setSubEmail] = useState('');

  // Contact edit handlers
  const startEditContact = () => { setEditContact(true); setCtTmp(ct); };
  const cancelEditContact = () => { setEditContact(false); setCtTmp(ct); };
  async function saveEditContact() {
    setCt(ctTmp);
    setEditContact(false);
    try {
      await fetch('http://localhost:5000/update-section', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          component: 'Footer',
          field: 'contactInfo',
          value: ctTmp
        })
      });
    } catch (err) { console.error('footer contact error', err); }
  }
  function chgCt(field, val) { setCtTmp({ ...ctTmp, [field]: val }); }

  // Links edit handlers
  const startEditLinks = () => { setEditLinks(true); setLnkTmp([...lnk]); };
  const cancelEditLinks = () => { setEditLinks(false); setLnkTmp([...lnk]); };
  async function saveEditLinks() {
    setLnk(lnkTmp);
    setEditLinks(false);
    try {
      await fetch('http://localhost:5000/update-section', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          component: 'Footer',
          field: 'usefulLinks',
          value: lnkTmp
        })
      });
    } catch (err) { console.error('footer link error', err); }
  }
 
  const linkChg = (idx, field, val) => {
    let d = [...lnkTmp]; d[idx] = { ...d[idx], [field]: val }; setLnkTmp(d);
  };

  function submitSub(e) {
    e.preventDefault();
    if (subEmail) {
      alert(`Thank you for subscribing with email: ${subEmail}`);
      setSubEmail('');
    }
  }

  return (
    <footer className="my-footer">
      <div className="downContainer">
        <div className="footerRow">
          {/* LogoandContact */}
          <div className="ftSection logoSec">
            <div className="ft-logoGrp">
              <span className="logoBall"><span className="logGold"></span></span>
              <span className="logoLab">
                <h3>IMPERIAL</h3>
                <span>GRAND HOTEL</span>
              </span>
            </div>
            <div className="ctBlock">
              {editContact ? (
                <div className="ctEditMode">
                  <textarea
                    value={ctTmp.description}
                    onChange={e => chgCt('description', e.target.value)}
                    className="ctEditTa"
                    rows="3"
                    placeholder="Hotel description"
                  />
                  <input type="email" value={ctTmp.email} onChange={e => chgCt('email', e.target.value)} className="ctEditInput" placeholder="Email address" />
                  <input type="tel" value={ctTmp.phone} onChange={e => chgCt('phone', e.target.value)} className="ctEditInput" placeholder="Phone number" />
                  <input type="text" value={ctTmp.address} onChange={e => chgCt('address', e.target.value)} className="ctEditInput" placeholder="Address" />
                  <div className="ftBtnsEdit">
                    <button className="doneBtn" onClick={saveEditContact}>Save</button>
                    <button className="btnX" onClick={cancelEditContact}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="txtDesc">{ct.description}</p>
                  <div className="ctDetGroup">
                    <span className="ctDetSpan">📧 {ct.email}</span>
                    <span className="ctDetSpan">📞 {ct.phone}</span>
                    <span className="ctDetSpan">📍 {ct.address}</span>
                  </div>
                  <button className="ctEditBtn" onClick={startEditContact}>Edit Contact</button>
                </>
              )}
            </div>
          </div>
          {/* Links */}
          <div className="ftSection linksArea">
            <div className="ftSectHd">
              <h4>USEFUL LINKS</h4>
              {!editLinks && <button className="editLinksBtn" onClick={startEditLinks}>Edit</button>}
            </div>
            {editLinks ? (
              <div className="linkEditBlock">
                {lnkTmp.map((l, i) => (
                  <div key={l.id} className="linkGrp">
                    <input type="text" value={l.title} onChange={e => linkChg(i, 'title', e.target.value)} className="linkInp" placeholder="Title" />
                    <input type="text" value={l.url} onChange={e => linkChg(i, 'url', e.target.value)} className="linkInp" placeholder="URL" />
                  </div>
                ))}
                <div className="ftBtnsEdit">
                  <button className="doneBtn" onClick={saveEditLinks}>Save</button>
                  <button className="btnX" onClick={cancelEditLinks}>Cancel</button>
                </div>
              </div>
            ) : (
              <ul className="ftLinks">
                {lnk.map(l => (
                  <li key={l.id}><a href={l.url} className="ftLink">{l.title}</a></li>
                ))}
              </ul>
            )}
          </div>
          {/* Subscribe */}
          <div className="ftSection subscrArea">
            <h4>SUBSCRIBE</h4>
            <p className="subTxt">Don't miss to subscribe our news, kindly fill the form below.</p>
            <form className="subForm" onSubmit={submitSub}>
              <span className="emailInpWrap">
                <input type="email" value={subEmail} onChange={e => setSubEmail(e.target.value)} placeholder="Your Email Here" className="emInp" required />
                <button type="submit" className="sbBtn"><span className="sbArrow">→</span></button>
              </span>
            </form>
          </div>
        </div>
        {/* Footer bottom: copyright, social */}
        <div className="ftBottom">
          <div className="ft-smRow">
<a className="smLink" href="#" aria-label="Twitter"><img src={twitterIcon} alt="Twitter" className="icSm" /></a>
            <a className="smLink" href="#" aria-label="Facebook"><img src={facebookIcon} alt="Facebook" className="icSm" /></a>
            <a className="smLink" href="#" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" className="icSm" /></a>
            <a className="smLink" href="#" aria-label="Gmail"><img src={gmailIcon} alt="Gmail" className="icSm" /></a>

          </div>
          <div className="footerCut"></div>
          <div className="cpDiv">
            <p className="cpTxt">© 2025 Imperial Grand Hotel. All Rights Reserved.</p>
            <div className="cpLinksArea">
              <a href="#" className="cpLnk">Privacy Policy</a>
              <a href="#" className="cpLnk">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
