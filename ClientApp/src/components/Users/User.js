import React, { Component } from 'react';
import AddUserModal from '../Users/AddUserModal';
//import UpdateUserModel from '../Users/UpdateUserModal';
import {
  Button, Table,
  Badge, ButtonToolbar, Modal,Form, ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";

//import './styles.css';

export default class Users extends Component {
  displayName = Users.name;

  constructor(props, context) {
    super(props, context);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.toggleUpdationModel = this.toggleUpdationModel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = {
      users: null,
      user: {
        Name: "",
        Surname: "",
        Email: "",
        RoleID: ""
      },
      showCreationModal: false,
      showUpdationModal: false
    };
  }


  
  handleFormChange = (value, field) => {
    //console.log("onChange", value, field)
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [field]: value
      }
    }));
    console.log("state.user",this.state.user);
  }

  componentDidMount = () => {
    fetch("api/user/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.users });
      });
  }


  toggleUpdationModel() {
    const {showUpdationModal} = this.state;
    this.setState({showUpdationModal: !showUpdationModal})
}


  handleDelete = (userId) => {
    console.log("id", userId);
    if (!window.confirm("Are you sure you want to delete the user?")) return;
    fetch("api/user/delete/" + userId, { method: "delete" })
      .then(responce => responce.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data.users })
      })
  }

  handleUpdate = (userId) => {
    console.log("from handleUpdate", userId);
    let userDTO = this.state.user;
    userDTO = { ...userDTO, userId: userId };
    fetch("api/user/edit/" + userId, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDTO)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data.users });
      })
  }

  renderUserTable = (user) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <td>Surname</td>
            <th>E-mail</th>
            <th>RoleId</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr key={user.userID}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.email}</td>
              <td>{user.roleID}</td>
              <td>
              <Button onClick={() => this.setState({ showUpdationModal: user.userID })}>Edit</Button>
                  <Modal
                      show={this.state.showUpdationModal === user.userID}                    
                      onHide={this.toggleUpdationModel}
                      dialogClassName="custom-modal">
                      <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-lg">
                              User updation
                              {console.log("call ", user.userID)}
                  </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          {"  "}
                          <Form inline>
                              <FormGroup>
                                  <ControlLabel>Name</ControlLabel>{" "}
                                  <FormControl
                                      type="text"
                                      placeholder={user.name}
                                      onChange={event => this.handleFormChange(event.target.value, "Name")}
                                    
                                  />{" "}
                                  
                              </FormGroup>{" "}
                              <FormGroup>
                                  <ControlLabel>Surname</ControlLabel>{" "}
                                  <FormControl
                                      type="text"
                                      placeholder={user.surname}
                                      onChange={event => this.handleFormChange(event.target.value, "Surname")}
                                      />
                                      
                              </FormGroup>{" "}
                              <FormGroup>
                                  <ControlLabel>Email</ControlLabel>{" "}
                                  <FormControl
                                      type="text"
                                      placeholder={user.email}
                                      onChange={event => this.handleFormChange(event.target.value, "Email")}
                                  />{" "}
                              </FormGroup>{" "}
                              <FormGroup>
                                  <ControlLabel>RoleId</ControlLabel>
                                  <FormControl
                                  type="text"
                                  placeholder={user.roleID}
                                  onChange={event => this.handleFormChange(event.target.value, "RoleID")}
                                  />{" "}
                              </FormGroup>
                              
                          </Form>
                          <br />
                          <Button onClick={() => this.handleUpdate(user.userID)} >Save changes</Button>

                      </Modal.Body>
                      <Modal.Footer>
                          <Button onClick={this.toggleUpdationModel}>Close</Button>
                      </Modal.Footer>
                  </Modal>
                  
                <Button bsStyle="link" onClick={() => this.handleDelete(user.userID)}>Delete</Button>
              </td>
            </tr>
        </tbody>
      </table>
    );
  }

  render = () => {
    let cards = this.state.users ? (this.state.users.map(user => this.renderUserTable(user))) : <div>Loading...</div>;
    return (
      <div>
        <h1>Users</h1>
        <p>Here you can see your Users in this semester</p>
        {cards}
        <br />
        <AddUserModal
          show = {this.state.showCreationModal}
          user = {this.state.user}
        />
        
      </div>
    );
  }
}
