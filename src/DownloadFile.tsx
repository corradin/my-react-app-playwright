import React from 'react';
import './DownloadFile.css';

class DownloadFile extends React.Component {
  downloadRandomPicture = () => {
    fetch('https://picsum.photos/200').then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'random_picture.jpg';
        a.click();
      });
    });
  };

  render() {
    return (
      <div id="container">
        <button onClick={this.downloadRandomPicture}>Download Random Picture</button>
        <p />
      </div>
    );
  }
}

export default DownloadFile;
