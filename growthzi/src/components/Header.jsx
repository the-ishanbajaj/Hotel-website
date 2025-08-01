import React from 'react';
import "../styles/Header.css";

function Header() {
  const [currentTab, setCurrentTab] = React.useState('home');
  
  // Handler function outside JSX
  function handleTab(tab) { setCurrentTab(tab); }
  
  return (
    <header className="mainHeader">
      <div className="headerRow">
        <div className="brandBlock">
          <span className="logoCircle">
            <span className="logoGradient"></span>
          </span>
          <div className="brandText">
            <h2>IMPERIAL</h2>
            <span>GRAND HOTEL</span>
          </div>
        </div>
        <nav className="topNav">
          <ul className="navList">
            <li
              className={`navEl${currentTab==='home'?' navCurrent':''}`}
              onClick={() => handleTab('home')}
            >
              <a href="#home">HOME</a>
            </li>
            <li className={currentTab==='about'?'navEl navCurrent':'navEl'}>
              <a href="#about" onClick={()=>handleTab('about')}>ABOUT</a>
            </li>
            <li className={currentTab==='service'?'navEl navCurrent':'navEl'}>
              <a href="#service" onClick={()=>handleTab('service')}>SERVICE</a>
            </li>
            <li className={currentTab==='pages'?'navEl navCurrent':'navEl'}>
              <a href="#pages" onClick={()=>handleTab('pages')}>PAGES</a>
            </li>
            <li className={currentTab==='contact'?'navEl navCurrent':'navEl'}>
              <a href="#contact" onClick={()=>handleTab('contact')}>CONTACT US</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
