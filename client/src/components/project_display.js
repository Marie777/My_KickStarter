import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../actions';

class ProjectDisplay extends Component {

  componentDidMount() {
      const {_id} = this.props.match.params;
      console.log(_id);
      this.props.fetchProject(_id);
  }

  render () {
    const { project } = this.props;
    if(!project){
      return <div> Loading...</div>;
    }
    return (
      <div>
        ddd
      </div>
    );
  }

}


function mapStateToProps({projects}, ownProps) {
  return { project: projects[ownProps.match.params._id] };
}

export default connect(mapStateToProps, {fetchProject})(ProjectDisplay);

// export default ProjectDisplay;
