import React, { Component } from 'react';
import {
  Button, Table,
  Badge, ButtonToolbar, Modal,Form, ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";


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

renderRoleTable = (role) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr key={role.roleID}>
          <td>{role.name}</td>
          <td>

            <Button>Edit</Button>
            <Button>Delete</Button>
          </td>
        </tr>

      </tbody>
    </table>
  );
}

render = () => {
  let cards = this.state.roles ? (this.state.roles.map(role => this.renderRoleTable(role))) : <div>Loading</div>;
  return (
    <div>
      <h1>Roles</h1>
      <p>Here you can see Roles</p>
      {cards}
      <Button>Add new role</Button>
    </div>
  )
}

}