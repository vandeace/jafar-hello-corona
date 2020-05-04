import React, { Component } from "react";
import { API } from "../config/api";
import { Jumbotron, Form, Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class jumbotron extends Component {
  state = {
    auth: false,
    signIn: false,
    redir: false,
    signUp: false,
    username: "",
    password: "",
    fullName: "",
    email: "",
    status: "",
    gender: "",
    phone: "",
    address: "",
  };

  componentDidMount() {
    const user = localStorage.getItem("auth");
    if (user) {
      this.setState({ auth: JSON.parse(user) });
    }
  }

  showSignUp = () => {
    this.setState({ signUp: true });
  };

  closeSignUp = () => {
    this.setState({ signUp: false });
  };

  handleChangeTxt = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
      this.setState({ redir: true });
    } catch (error) {
      console.log(error);
    }
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
      this.setState({ redir: true });
    } catch (error) {
      console.log(error);
    }
  };

  handleClick = () => {
    if (this.state.auth) {
      this.setState({ redir: true });
    } else {
      this.setState({ signIn: true });
    }
  };

  closeSignIn = () => {
    this.setState({ signIn: false });
  };

  render() {
    if (this.state.redir) return <Redirect to='/form' />;

    return (
      <div>
        <Jumbotron>
          <div className='container py-3 d-flex align-items-top justify-content-between'>
            <div className='container-fluid' style={{ width: "50%" }}>
              <div className='d-flex align-items-top'>
                <div className='row'>
                  <img
                    src={process.env.PUBLIC_URL + "/logos/covid.png"}
                    className='covid'
                    alt='...'
                    style={{
                      marginTop: 50,
                      marginLeft: 100,
                      width: "20%",
                    }}
                  />

                  <h1 className='text-white ml-5'>Cegah Covid-19</h1>
                  <h2 className='text-white ml-5'>dengan melakukan</h2>
                </div>
              </div>
              <p className='mt-3' style={{ marginLeft: 0 }}>
                <button
                  onClick={this.handleClick}
                  className='btn btn-light ml-5 mt-3'
                  style={{ color: "#ff6185" }}
                >
                  <img
                    style={{ height: 40 }}
                    className='mr-3'
                    alt='..'
                    src={process.env.PUBLIC_URL + "/logos/button.png"}
                  />
                  Konsultasi Dengan Dokter
                </button>
              </p>
            </div>

            <div className='container-fluid' style={{ width: "50%" }}>
              <div className='d-flex' style={{ maxWidth: "620px" }}>
                <div className='text-center'>
                  <img
                    src={process.env.PUBLIC_URL + "/logos/Crowd.png"}
                    alt=''
                  />
                </div>

                <div className='text-center mr-3'>
                  <img
                    src={process.env.PUBLIC_URL + "/logos/Hand.png"}
                    alt=''
                  />
                </div>

                <div className='text-center'>
                  <img
                    src={process.env.PUBLIC_URL + "/logos/Eyes.png"}
                    alt=''
                  />
                </div>

                <div className='text-center'>
                  <img
                    src={process.env.PUBLIC_URL + "/logos/House.png"}
                    alt=''
                  />
                </div>
              </div>
            </div>
            {/* //batas */}
          </div>
        </Jumbotron>

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
      </div>
    );
  }
}
