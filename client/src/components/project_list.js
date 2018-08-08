import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';
import { fetchProjects } from '../actions';

class ProjectList extends Component {

  componentWillMount() {
    this.props.fetchProjects();

      // if(JSON.parse(window.localStorage.getItem('user'))){
      // const {username, type} = JSON.parse(window.localStorage.getItem('user'));
      //     console.log("-------- " + username + " " + type);
      // }
    //   window.localStorage.removeItem('user');

  }

  foundedPrecent(_id){
      const project = this.props.projects[_id];
      if(project.donationList){
          const {donationList} = this.props.projects[_id];
          let sumDonations  = donationList.reduce((acc,d)=> {
              acc = acc + d.donationAmount;
              return acc;
          },0);
          return (sumDonations/project.amount*100).toFixed(2);
      }else{
          return 0;
      }
  }

  registeredDOnations(_id){
      if(this.props.projects[_id].donationList){
          return this.props.projects[_id].donationList.length;
      }else{
          return 0;
      }
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
                    <ListGroupItem><label> {this.foundedPrecent(project._id)}% funded </label></ListGroupItem>
                    <ListGroupItem><label> {this.registeredDOnations(project._id)}  registered donations</label></ListGroupItem>
                  </ListGroup>
                </Col>
            </Link>
        </Row>
      );
    });
  }

  liveProjectsNotYetFounded(){
      const {projects} = this.props;
      return Object.keys(projects).reduce((acc,_id)=> {
          let f = this.foundedPrecent(_id);
          return (f < 100 ? acc + 1 : acc);
      },0)
    }

  renderfields(){
    const {projects} = this.props;
    console.log(Object.keys(projects).length);
    // console.log(this.props.test);

    return (
      <ListGroup>
        <ListGroupItem>Total live projects: {Object.keys(projects).length}</ListGroupItem>
        <ListGroupItem>Total live projects not yet founded: {this.liveProjectsNotYetFounded()}</ListGroupItem>
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
    projects: state.projects,
    // test: state
   };
}

export default connect(mapStateToProps, {fetchProjects})(ProjectList);
