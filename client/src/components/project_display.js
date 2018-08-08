import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject, deleteProject, deleteDonation} from '../actions';
import {ButtonToolbar, Button, Grid, Row, Col, ListGroup, ListGroupItem, NavItem} from 'react-bootstrap';
import _ from 'lodash';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";

class ProjectDisplay extends Component {

    componentDidMount() {
        const {_id} = this.props.match.params;
        this.props.fetchProject(_id);
    }

  onDeleteClick() {
    const {_id} = this.props.match.params;
    this.props.deleteProject(_id, () => this.props.history.push('/'));
  }

  onEditClick() {
    const {_id} = this.props.match.params;
    this.props.history.push('/');
    this.props.history.push(`editproject/${_id}`);
  }

  onDonateClick () {
    const {_id} = this.props.match.params;
    this.props.history.push('/');
    this.props.history.push(`donate/${_id}`);
  }



  onDeleteDonationClick (donationAmount) {
    const {_id} = this.props.match.params;
      this.props.deleteDonation(_id, donationAmount, () => this.props.history.push('/'));
  }



  renderDonations(){
    const { project } = this.props;
    if(!project.donationList){
      return(<div> </div>);
    }else{
      return _.map(project.donationList, donation => {
          return (
            <Row>
                <label> Donation amount: {donation.donationAmount}    </label>
                {this.renderDeleteDonationBTN(donation.donationAmount)}
            </Row>
          );
      });
    }
  }



    renderDeleteDonationBTN(donationAmount){
        if (JSON.parse(window.localStorage.getItem('user'))) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (user.type === "donator") {
                return (null)
            }
            if (user.type === "founder" || user.type === "admin") {
                return (
                    <Button bsStyle="primary" onClick={this.onDeleteDonationClick.bind(this, donationAmount)}>
                        Delete
                    </Button>
                )
            }
        }
    }


    renderDonateBTN(){
        if (JSON.parse(window.localStorage.getItem('user'))) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (user.type === "founder") {
                return (null)
            }
            if (user.type === "donator") {
                return (
                    <Button bsStyle="primary" onClick={this.onDonateClick.bind(this)}>
                        Donate
                    </Button>
                )
            }
        }
    }



    renderEditBTN(){
        if (JSON.parse(window.localStorage.getItem('user'))) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (user.type === "donator") {
                return (null)
            }
            if (user.type === "founder" || user.type === "admin") {
                return (
                    <Button bsStyle="primary" onClick={this.onEditClick.bind(this)}>
                        Edit
                    </Button>
                )
            }
        }
    }


    renderDeleteBTN(){
        if (JSON.parse(window.localStorage.getItem('user'))) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (user.type === "founder" || user.type === "donator") {
                return (null)
            }
            if ( user.type === "admin") {
                return (
                    <Button bsStyle= "danger" onClick={this.onDeleteClick.bind(this)}>
                        Delete (Admin)
                    </Button>
                )
            }
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


    renderVideo(project){
        if(project.video) {
            const urlVideo = "http://localhost:3001/project/video/" + project.video;
            console.log(project.video);

            return (
                <ListGroupItem>
                    <Player
                        playsInline
                        poster="/assets/poster.png"
                        src={urlVideo}
                        fluid={false}
                        width={350}
                        height={300}
                    />
                </ListGroupItem>
            );
        }else{
            return null;
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
          {this.renderVideo(project)};
      </ListGroup>
        <ButtonToolbar>
            {this.renderDonateBTN()}
            {this.renderEditBTN()}
            {this.renderDeleteBTN()}
        </ButtonToolbar>
      </div>
    );
  }

}


function mapStateToProps({projects}, ownProps) {
  return { project: projects[ownProps.match.params._id] };
}

export default connect(mapStateToProps, {fetchProject, deleteProject, deleteDonation})(ProjectDisplay);
