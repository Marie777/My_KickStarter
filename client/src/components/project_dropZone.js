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

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
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
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h5>Rejected files</h5>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default Accept
