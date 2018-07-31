import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions';
import _ from 'lodash';
import projectsReducer from '../reducers/reducer_projects'


class ProjectList extends Component {

  imageClick() {
    console.log("click");
  }

  componentDidMount() {
      this.props.fetchProjects();
  }

  renderProjects() {
    const imgUrl = "http://localhost:3001/project/";

    return _.map(this.props.projects, project => {
      const imgName = project.images
                      ? project.images[0]
                      ? project.images[0]
                      : "No-image-available.jpg"
                      : "No-image-available.jpg";
      return(
        <li className="list-group-item" key={project._id}>
          <div className="image">
              <img src={imgUrl + imgName} height="100px" width="100px" alt=""/>
          </div>
          <div className="content">
            <div><label> Title: </label> {project.title}</div>
            <div><label> Summary: </label> {project.description}</div>
            <div><label> ____% funded </label> </div>
            <div><label> ______ registered </label></div>
          </div>
          <div>
            <button onClick={this.imageClick.bind(this)}>
              Edit
            </button>
            <button>
              Delete
            </button>
          </div>
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
    projects: state.projects,
   };
}

export default connect(mapStateToProps, {fetchProjects})(ProjectList)
