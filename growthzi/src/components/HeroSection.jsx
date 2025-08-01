import React from 'react';
import "../styles/HeroSection.css";

function HeroSection() {
  const [inEdit, setInEdit] = React.useState(false);
  const [headlineText, setHeadlineText] = React.useState('A Luxurious Way to Enjoy Your Life');
  const [inputVal, setInputVal] = React.useState(headlineText);

  function startEdit() {
    setInEdit(true);
    setInputVal(headlineText);
  }

  async function handleHeadlineSave() {
    setHeadlineText(inputVal);
    setInEdit(false);

    // send to Flask backend
    try {
      await fetch('http://localhost:5000/update-section', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          component: 'HeroSection',
          field: 'title',
          value: inputVal
        })
      });
    } catch (err) {
      // handle error
      console.error("Failed to save hero title", err);
    }
  }

  function cancelEdit() {
    setInEdit(false);
    setInputVal(headlineText);
  }

  return (
    <section className="heroSectionMain">
      <div className="heroBgLayer">
        <div className="heroOverlay"></div>
      </div>
      <div className="heroInContent">
        <div className="heroTextFlex">
          <div className="titleRow">
            {inEdit
              ? (
                  <div className="editAreaHero">
                    <input
                      type="text"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      className="editHeroInput"
                    />
                    <div className="editButtonsBar">
                      <button onClick={handleHeadlineSave} className="sBtn">Save</button>
                      <button onClick={cancelEdit} className="xBtn">Cancel</button>
                    </div>
                  </div>
                )
              : (
                  <>
                    <h1 className="hero--title">{headlineText}</h1>
                    <button onClick={startEdit} className="editNowBtn">Edit</button>
                  </>
                )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
