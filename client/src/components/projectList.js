import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom'
import _ from 'lodash';
import { fetchProjects } from '../actions';

class ProjectList extends Component {

  componentDidMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    const imgUrl = "http://localhost:3001/project/image/";

    return _.map(this.props.projects, project => {
      const imgName = project.images
                      ? project.images[0]
                      ? project.images[0]
                      : "No-image-available.jpg"
                      : "No-image-available.jpg";
      const {_id} = project;
      return(
        <li className="list-group-item" key={_id} >
          <Link to={`ProjectDisplay/${_id}`}>
            <div className="image">
                <img
                  src={imgUrl + imgName}
                  height="100px"
                  width="100px"
                  alt=""
                />
            </div>
            <div className="content">
              <div><label> Title: </label> {project.title}</div>
              <div><label> Summary: </label> {project.description}</div>
              <div><label> ____% funded </label> </div>
              <div><label> ______ registered </label></div>
            </div>
          </Link>
        </li>
      );
    });
  }

  render () {
    return (
      <div>
        <ul className="list-group">
          {this.renderProjects()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
   };
}

export default connect(mapStateToProps, {fetchProjects})(ProjectList);
