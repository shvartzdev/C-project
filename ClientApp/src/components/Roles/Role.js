import React, { Component } from 'react';
import {
  Button, Table,
  Badge, ButtonToolbar, Modal,Form, ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import AddRoleModal from './AddRoleModal';
import UpdateRoleModal from './UpdateRoleModal';

import '../Courses/styles.css';

export default class Roles extends Component {
  constructor(props, context) {
    super(props,context);


    this.handleFormChange = this.handleFormChange.bind(this);

    this.state = {
      roles: null,
      role: {
        "Name": ""
      },
      showCreationModal: false,
      showUpdationModal: false
    };
  }

  handleDelete = (roleId) => {
    console.log("id", roleId);
    if (!window.confirm("Are you sure you want to delete the user?")) return;
    fetch("api/role/delete/" + roleId, { method: "delete" })
      .then(responce => responce.json())
      .then(data => {
        console.log(data);
        this.setState({ roles: data.roles })
      })
  }
 


  handleFormChange = (value, field) => {
    //console.log("onChange", value, field)
    this.setState(prevState => ({
      role: {
        ...prevState.role,
        [field]: value
      }
    }));
    console.log("state.role",this.state.role);
  }

  componentDidMount = () => {
    fetch("api/role/getall", {dataType: 'json'})
      .then(responce => responce.json())
      .then(data => {
        this.setState({roles : data.roles});
      });
  }


  toggleUpdationModel() {
    const {showUpdationModal} = this.state;
    this.setState({showUpdationModal: !showUpdationModal})
}

renderRoleBlock = (role) => {
  return (
    <div>
      <div className="course" key={role.roleID}>
        <h1>{role.name}</h1>
        <p><UpdateRoleModal role={this.state.role} roleID = {role.roleID}/></p>
        <p><Button onClick={() => this.handleDelete(role.roleID)}>Delete</Button></p>
      </div>
    </div>
  );
}

render = () => {
  let cards = this.state.roles ? (this.state.roles.map(role => this.renderRoleBlock(role))) : <div>Loading</div>;
  return (
    <div>
      <h1>Roles</h1>
      <p>Here you can see Roles</p>
      {cards}
     <AddRoleModal>
       show = {this.state.showCreationModal}
       role = {this.state.role}
     </AddRoleModal>
    </div>
  )
}

}