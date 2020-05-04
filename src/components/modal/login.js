import React, { Component } from "react";
import { Nav, Navbar, Form, Button, Modal } from "react-bootstrap";

export default class login extends Component {
  render() {
    return (
      <div>
        <Modal
          size='md'
          centered
          show={this.props.signIn}
          onHide={this.closeSignIn}
          className='custom-map-modal modal-x'
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form>
              <h1 style={{ textAlign: "center", color: "#ff6185" }}>LOGIN</h1>

              <Form.Group>
                <Form.Label className='bold'>Username</Form.Label>
                <Form.Control
                  name='username'
                  type='text'
                  placeholder='Enter Username'
                  onChange={this.handleChangeTxt}
                  value={this.state.username}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Password'
                  onChange={this.handleChangeTxt}
                  value={this.state.password}
                />
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className='btn-sign btn btn-signin font-weight-bold'
                  style={{ display: "flex", justifyContent: "center" }}
                  onClick={this.handleLogin}
                >
                  SIGN IN
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <p
              onClick={() => {
                this.closeSignIn();
                this.showSignUp();
              }}
            >
              Don't have an account? <b>Click Here!</b>
            </p>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
