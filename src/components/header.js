import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { Navbar, Form, Button, Modal } from "react-bootstrap";

export default class header extends Component {
  state = {
    signIn: false,
    signUp: false,
    username: "",
    password: "",
    fullName: "",
    email: "",
    status: "",
    gender: "",
    phone: "",
    address: "",
    userData: null,
  };

  componentDidMount() {
    this.handleCheckLogin();
  }
  handleChangeTxt = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheckLogin = () => {
    const user = localStorage.getItem("auth");
    if (user) {
      this.setState({ userData: JSON.parse(user) });
    }
  };

  showSignIn = () => {
    this.setState({ signIn: true });
  };

  closeSignIn = () => {
    this.setState({ signIn: false });
  };

  handleLogin = async () => {
    try {
      const user = await API.post("/login", {
        username: this.state.username,
        password: this.state.password,
      });
      const { data } = user.data;
      localStorage.setItem("credentials", JSON.stringify(data));
      localStorage.setItem("auth", "true");
      console.log(data.status);
      window.location.reload(false);
      this.setState({ signIn: false });
    } catch (error) {
      console.log(error);
    }
  };

  showSignUp = () => {
    this.setState({ signUp: true });
  };

  closeSignUp = () => {
    this.setState({ signUp: false });
  };

  handleRegister = async () => {
    try {
      const user = await API.post("/register", {
        username: this.state.username,
        password: this.state.password,
        fullName: this.state.fullName,
        email: this.state.email,
        status: this.state.status,
        gender: this.state.gender,
        phone: this.state.phone,
        address: this.state.address,
      });
      const { data } = user.data;
      localStorage.setItem("credentials", JSON.stringify(data));
      localStorage.setItem("auth", "true");
      console.log(data.status);
      window.location.reload(false);
      this.setState({ signUp: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Navbar>
          <div className='col-lg-2'>
            <Link to='/'>
              <img
                alt='..'
                style={{ height: "55px" }}
                src={process.env.PUBLIC_URL + "/logos/home.svg"}
              />
            </Link>
          </div>

          <div className='col-lg-8'></div>
          <div className='col-lg-2'>
            <div className='d-flex'>
              <button
                className='btn-sign btn btn-signin mr-3 font-weight-bold'
                onClick={this.showSignIn}
              >
                Sign In
              </button>
              <button
                className='btn-signup btn btn-signup btn-light font-weight-bold'
                onClick={this.showSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </Navbar>

        <Modal
          size='md'
          centered
          show={this.state.signIn}
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
                  LOGIN
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

        <Modal
          size='md'
          centered
          show={this.state.signUp}
          onHide={this.closeSignUp}
          className='custom-map-modal modal-x'
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form>
              <h1 style={{ textAlign: "center", color: "#ff6185" }}>
                REGISTER
              </h1>

              <Form.Group>
                <Form.Label className='bold'>Full Name</Form.Label>
                <Form.Control
                  name='fullName'
                  type='text'
                  placeholder='Enter Full Name'
                  onChange={this.handleChangeTxt}
                  value={this.state.fullName}
                />
              </Form.Group>

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

              <Form.Group>
                <Form.Label className='bold'>Email</Form.Label>
                <Form.Control
                  name='email'
                  type='text'
                  placeholder='Enter Email'
                  onChange={this.handleChangeTxt}
                  value={this.state.email}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Password'
                  onChange={this.handleChangeTxt}
                  value={this.state.password}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className='bold'>Status</Form.Label>
                <select
                  onChange={this.handleChangeTxt}
                  defaultValue={"select"}
                  name='status'
                  id='gender'
                  className='form-control'
                >
                  <option value='select' disabled>
                    Select Status
                  </option>
                  <option value='doctor'>Doctor</option>
                  <option value='patient'>Patient</option>
                </select>
              </Form.Group>

              <Form.Group>
                <Form.Label className='bold'>Gender</Form.Label>
                <select
                  onChange={this.handleChangeTxt}
                  defaultValue={"select"}
                  name='gender'
                  id='gender'
                  className='form-control'
                >
                  <option value='select' disabled>
                    Select Gender
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </Form.Group>

              <Form.Group>
                <Form.Label className='bold'>Phone</Form.Label>
                <Form.Control
                  name='phone'
                  type='text'
                  onChange={this.handleChangeTxt}
                  value={this.state.phone}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className='bold'>Address</Form.Label>
                <Form.Control
                  name='address'
                  type='text'
                  onChange={this.handleChangeTxt}
                  value={this.state.address}
                />
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className='btn-sign btn btn-signin font-weight-bold'
                  style={{ display: "flex", justifyContent: "center" }}
                  onClick={this.handleRegister}
                >
                  REGISTER
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
