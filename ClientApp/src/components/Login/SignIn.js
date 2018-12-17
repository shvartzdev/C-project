import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Col,
  Button,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

export default class SignIn extends Component {
  displayName = SignIn.name;

  constructor(props) {
    super(props);
    this.state = { userName: "", email: "", password: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  render = () => {
    const tooltip = (
      <Tooltip id="tooltip">
        <strong>Please, use your corporative E-mail!</strong>
      </Tooltip>
    );
    return (
      <div>
        <h1>Sign In</h1>
        <Form horizontal>
        
        <FormGroup controlId="formHorizontalUserName">
              <Col componentClass={ControlLabel} sm={1}>
                Name
              </Col>
              <Col sm={5}>
                <FormControl type="text" placeholder="Enter your login" onChange={event => this.setState({
                  userName: event.target.value
                })}/>
              </Col>
            </FormGroup>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={1}>
                E-mail
              </Col>
              <Col sm={5}>
                <FormControl type="email" placeholder="example@email.com" onChange={event => this.handleEmailChange(event)}/>
              </Col>
            </FormGroup>
          </OverlayTrigger>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={1}>
              Password
            </Col>
            <Col sm={5}>
              <FormControl type="password" placeholder="Password" onChange={event => this.handlePasswordChange(event)}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={1} sm={10}>
              <Button onClick={this.handleLoginClick} bsStyle="primary">
                Sign In
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  handleEmailChange = (evt) => {
    console.log(this.state);
    this.setState({
      email: evt.target.value
    });
  }

  handlePasswordChange = (evt) => {
    console.log(this.state);
    this.setState({
      password: evt.target.value
    });
  }

  handleLoginClick = () => {
    console.log(this.state);
    fetch("api/Auth/sign-in", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(this.state)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('id_token', data.id_token);

      });;
  }
}