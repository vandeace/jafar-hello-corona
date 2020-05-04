import React, { Component } from "react";
import "../style/transaction_item.css";
import axios from "axios";
import Moment from "react-moment";
import { Row, Col, Modal, Button } from "react-bootstrap";

export default class consult_item extends Component {
  state = {
    modal: false,
    reply: "",
  };

  showModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChangeTxt = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleReply = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("credentials"));
      const id = this.props.item.id;
      const user = await axios({
        method: "POST",
        data: { reply: this.state.reply },
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
        // url: `http://localhost:5000/api/v1/consultation/${id}/reply`,
        url: `https://hello-corona.herokuapp.com/api/v1/consultation/${id}/reply`,
      });
      console.log(user);
      if (user) {
        window.location.reload(false);
        this.setState({ modal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCancel = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("credentials"));
      const id = this.props.item.id;
      const user = await axios({
        method: "PATCH",
        data: { status: "Cancel" },
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
        // url: `http://localhost:5000/api/v1/consultation/${id}`,
        url: `https://hello-corona.herokuapp.com/api/v1/consultation/${id}`,
      });
      console.log(user);
      if (user) {
        window.location.reload(false);
        this.setState({ modal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const data = this.props.item;
    return (
      <div>
        <Row>
          <Col xs={1} className='transaction-item-text'>
            {data.id}
          </Col>
          <Col xs={2} className='transaction-item-text'>
            <div style={{ textTransform: "capitalize" }}>{data.fullName}</div>
          </Col>
          <Col xs={2} className='transaction-item-text'>
            <div style={{ textTransform: "capitalize" }}>{data.subject}</div>
          </Col>
          <Col xs={2} className='transaction-item-text'>
            <Moment format='YYYY-MM-DD'>{data.createdAt}</Moment>
          </Col>
          {data.status === "Waiting Approve Consultation Live" && (
            <Col xs={3} className='transaction-item-text color-orange'>
              {data.status}
            </Col>
          )}
          {data.status === "Waiting Live Consultation" && (
            <Col xs={3} className='transaction-item-text color-green'>
              {data.status}
            </Col>
          )}
          {data.status === "Cancel" && (
            <Col xs={3} className='transaction-item-text color-red'>
              {data.status}
            </Col>
          )}
          <Col xs={2} className='transaction-item-text'>
            <img
              src={process.env.PUBLIC_URL + `../pic/search.png`}
              alt=''
              onClick={this.showModal}
            ></img>
          </Col>
        </Row>
        <p className='transaction-item-line' />

        <Modal
          size='lg'
          show={this.state.modal}
          onHide={this.closeModal}
          // aria-labelledby='example-modal-sizes-title-xl'
          centered
          aria-labelledby='contained-modal-title-vcenter'
        >
          <Modal.Header closeButton></Modal.Header>
          <div className='pt-3 p-2 mb-3'>
            <div className='px-3'>
              <div className='d-flex justify-content-between align-items-top'>
                <div className='pt-3'>
                  <h4>{data.subject}</h4>
                  <p>{data.description}</p>
                </div>
                <div>
                  <div className='p-3 timeline-wrapper'>
                    <ul className='StepProgress'>
                      <li className='StepProgress-item is-done'>
                        <div className='d-flex'>
                          <div className='mr-4'>
                            <div className='bold'>Date of Complaint</div>
                            <div>
                              <Moment format='DD,MMM YYYY'>
                                {data.createdAt}
                              </Moment>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className='StepProgress-item is-done'>
                        <div className='d-flex'>
                          <div className='mr-4'>
                            <div className='bold'>LIVE Consultation</div>
                            <div>
                              <Moment format='DD,MMM YYYY'>
                                {data.liveConsult}
                              </Moment>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <table className='table table-striped table-bordered table-sm'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>FullNAme</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>age</th>
                    <th>height</th>
                    <th>weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>1</th>
                    <td>{data.fullName}</td>
                    <td>{data.gender}</td>
                    <td>{data.phone}</td>
                    <td>{data.age}</td>
                    <td>{data.height}</td>
                    <td>{data.weight}</td>
                  </tr>
                </tbody>
              </table>
              <div className='form-group'>
                <label
                  htmlFor='description'
                  className='form-control-label bold'
                >
                  Give Response
                </label>
                <textarea
                  required
                  autoComplete='off'
                  value={this.state.reply}
                  onChange={this.handleChangeTxt}
                  name='reply'
                  className='textareas'
                />
              </div>
              <div className='float-right d-flex'>
                <Button
                  variant='danger'
                  className='mr-2 btn-sm bold'
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant='success'
                  className='bold'
                  onClick={this.handleReply}
                >
                  > Approve
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
