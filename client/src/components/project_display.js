import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject, deleteProject} from '../actions';
import { ButtonToolbar, Button, Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

class ProjectDisplay extends Component {

  onDeleteClick() {
    const {_id} = this.props.match.params;
    this.props.deleteProject(_id, () => this.props.history.push('/'));
  }

  onEditClick() {

  }

  componentDidMount() {
      const {_id} = this.props.match.params;
      this.props.fetchProject(_id);
  }

  renderDonations(){
    const { project } = this.props;
    if(!project.donationList){
      return(<div> </div>);
    }else{
      return _.map(project.donationList, donation => {
          return (
            <Row>
            <label> Donation amount: </label>
            </Row>
          );
      });
    }
  }

  renderImages() {
    const imgUrl = "http://localhost:3001/project/image/";
    const { project } = this.props;
    if(!project.images){
      return(<div> </div>);
    }else{
      return _.map(project.images, img => {
          return (
            <Col sm={23} md={3}>
              <img
                src={imgUrl + img}
                height="200px"
                width="200px"
                alt=""
              />
            </Col>
          );
      });
    }
  }

  render () {
      // debugger;
    const { project } = this.props;
    if(!project){
      return <div> Loading...</div>;
    }
    return (
      <div>

      <ListGroup>
        <ListGroupItem><label> Title: </label> {project.title}</ListGroupItem>
        <ListGroupItem><label> Summary: </label> {project.description}</ListGroupItem>
        <ListGroupItem><label> Amount: </label> {project.amount}</ListGroupItem>
        <ListGroupItem><label> Expiration Date: </label> {project.expirationDate}</ListGroupItem>
        <ListGroupItem><label> Explanation: </label> {project.explanation}</ListGroupItem>
        <ListGroupItem><label> Images: </label>
          <Grid className="container-fluid"> {this.renderImages()} </Grid>
        </ListGroupItem>
        <ListGroupItem><label> Donations: </label>
          <Grid className="container-fluid"> {this.renderDonations()} </Grid>
        </ListGroupItem>
      </ListGroup>



        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.onEditClick.bind(this)}>
            Edit
          </Button>
          <Button bsStyle= "danger" onClick={this.onDeleteClick.bind(this)}>
            Delete Project
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

}


function mapStateToProps({projects}, ownProps) {
  return { project: projects[ownProps.match.params._id] };
}

export default connect(mapStateToProps, {fetchProject, deleteProject})(ProjectDisplay);
