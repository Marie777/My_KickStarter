import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../actions';
import { ButtonToolbar, Button } from 'react-bootstrap';


class ProjectDisplay extends Component {

  editClick() {

  }

  componentDidMount() {
      const {_id} = this.props.match.params;
      console.log(_id);

      this.props.fetchProject(_id);
  }

  render () {
      // debugger;
    const { project } = this.props;
    if(!project){
      return <div> Loading...</div>;
    }
    return (
      <div>

        <div className="content">
          <div><label> Title: </label> {project.title}</div>
          <div><label> Summary: </label> {project.description}</div>
          <div><label> amount: </label> {project.amount}</div>
          <div><label> expirationDate: </label> {project.expirationDate}</div>
          <div><label> explanation: </label> {project.explanation}</div>
        </div>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.editClick.bind(this)}>
            Edit
          </Button>
          <Button bsStyle= "danger">
            Delete Project
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

}


function mapStateToProps({projects}, ownProps) {
  console.log(projects);
  return { project: projects[ownProps.match.params._id] };
}

export default connect(mapStateToProps, {fetchProject})(ProjectDisplay);

// export default ProjectDisplay;
