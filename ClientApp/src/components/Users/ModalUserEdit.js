import React, { Component } from "react";
import {
  Modal,
  Button,
  FormControl,
  Form,
  ControlLabel,
  FormGroup,
  Col,
  HelpBlock
} from "react-bootstrap";

export default class ModalUserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true
    };
  }

  componentDidMount = () => {
    const { credentials, roles, userRoles, actions, action } = this.props;
    this.setState({
      credentials: credentials,
      roles: roles,
      userRoles: userRoles,
      actions: actions,
      action: action, 
    });
    console.log(this.state.credentials);
  };

  handleFormChange = (value, field) => {
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        [field]: value
      }
    }));
    console.log(this.state.credentials);
  };

  handleFormUserChange = (value, field) => {
    this.setState(prevState => ({
      credentials: {
        ...prevState.credentials,
        user: {
          ...prevState.credentials.user,
          [field]: value
        }
      }
    }));
    console.log(this.state.credentials);
  }

  handleSave = () => {
    if (this.state.action === this.state.actions[0]) {
      fetch("api/Auth/Register", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.credentials)
      });
    }
    if (this.state.action === this.state.actions[1]) {
      fetch("api/User/Update", {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.credentials)
      });
    }
  };

  render = () => {
    const { show, roles, close, action } = this.props;
    let help =
      this.state.actions && action === this.state.actions[1]
        ? "You can change your pass by typing new above"
        : "";
    return (
      <div className="static-modal">
        <Modal show={show} onHide={close}>
          <Modal.Header>
            <Modal.Title>User edition</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={9}>
                  <FormControl
                    type="text"
                    placeholder="Enter name"
                    onChange={event => {
                      this.handleFormUserChange(event.target.value, "userName");
                    }}
                    defaultValue={this.props.credentials.user.userName}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={9}>
                  <FormControl
                    type="email"
                    placeholder="Enter E-mail"
                    onChange={event => {
                      this.handleFormUserChange(event.target.value, "email");
                    }}
                    defaultValue={this.props.credentials.user.email}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formRole">
                <Col componentClass={ControlLabel} sm={2}>
                  Role
                </Col>
                <Col sm={9}>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={event => {
                      this.handleFormChange(event.target.value, "roleId");
                    }}
                  >
                    {roles.map(role => (
                      <option
                        key={role.id}
                        value={role.id}
                        selected={role.id === this.props.credentials.roleId}
                      >
                        {role.name}
                      </option>
                    ))}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup controlId="formEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Pass
                </Col>
                <Col sm={9}>
                  <FormControl
                    type="password"
                    placeholder="Enter new password"
                    onChange={event => {
                      this.handleFormChange(event.target.value, "password");
                    }}
                    defaultValue={this.props.credentials.password}
                  />
                  <HelpBlock>{help}</HelpBlock>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
            <Button onClick={() => this.handleSave()} bsStyle="primary">
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}