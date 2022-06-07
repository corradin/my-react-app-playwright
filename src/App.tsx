import React from 'react';
import logo from './logo.svg';
import './App.css';
import CSS from 'csstype';
import DownloadFile from './DownloadFile';

type ClockState = {
  time: Date
}

class App extends React.Component<{}, ClockState> {
  intervalID: NodeJS.Timeout = setTimeout(() => {}, 0);

  constructor(props: Readonly<App>) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    const strangeLinkStyle: CSS.Properties = {
      display: 'flex',
      alignItems: 'baseline',
      width: '420px',
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
          <p>
            The time is {this.state.time.toLocaleString()}.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <DownloadFile />
          <img data-test-id="random-game-image" src="https://api.lorem.space/image/game?w=250" alt="random-game-poster"/>
        </header>
      </div>
    );
  }
}

export default App;
