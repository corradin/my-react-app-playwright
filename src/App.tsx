import React from 'react';
import logo from './logo.svg';
import './App.css';
import CSS from 'csstype';

function App() {
  const strangeLinkStyle: CSS.Properties = {
    display: 'flex',
    alignItems: 'baseline',
    width: '420px'
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* Strangely styled link */}
        <div style={strangeLinkStyle}>
          <a href="http://www.google.com" id="unclickable_link">
            OK
          </a>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
