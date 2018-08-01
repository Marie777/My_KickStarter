import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Label, Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
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
        <Row>
            <Link to={`ProjectDisplay/${_id}`}>
              <Col sm={23} md={3}>
                  <img
                    src={imgUrl + imgName}
                    height="200px"
                    width="200px"
                    alt=""
                  />
                </Col>
                <Col sm={23} md={8}>
                  <ListGroup>
                    <ListGroupItem><label> Title: </label> {project.title}</ListGroupItem>
                    <ListGroupItem><label> Summary: </label> {project.description}</ListGroupItem>
                    <ListGroupItem><label> ____% funded </label></ListGroupItem>
                    <ListGroupItem><label> ____  registered </label></ListGroupItem>
                  </ListGroup>
                </Col>
            </Link>
        </Row>
      );
    });
  }

  renderfields() {
    const {projects} = this.props;
    console.log(Object.keys(projects).length);
    return (
      <ListGroup>
        <ListGroupItem>Total live projects: {Object.keys(projects).length}</ListGroupItem>
        <ListGroupItem>Total live projects not yet founded: </ListGroupItem>
      </ListGroup>
    );
  }

  render () {
    return (
      <div>
        <div>
          {this.renderfields()}
        </div>
        <Grid className="container-fluid">
          {this.renderProjects()}
        </Grid>
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
