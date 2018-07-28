import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class Accept extends Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  sendImages() {
      console.log(this.state);
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            style={{
              width: '600px',
              height: '200px',
              borderWidth: '2px',
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: '5px',
              padding: '200px',
              margin: '30px'
            }}
            accept="image/jpeg, image/png, video/*"
            onDrop={(accepted, rejected) => { this.setState({...this.state, accepted, rejected }); }}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
        </div>
        <aside>
          <h5>Accepted files</h5>
          <ul>
            {
              this.state.accepted.map((f, i) =>
                <li key={f.name}>
                  {f.name} - {f.size} bytes
                  <img key={i} className="img-thumbnail"
                       src={f.preview} alt="preview"/>
                </li>
              )
            }
          </ul>
          <h5>Rejected files</h5>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        <button className="btn btn-primary" onClick={this.sendImages.bind(this)}> upload images </button>
      </section>
    );
  }
}

export default Accept
