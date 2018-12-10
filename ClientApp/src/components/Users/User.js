import React, { Component } from 'react';

import {
  Button
  // Badge,
  // FormGroup,
  // InputGroup,
  // FormControl
} from "react-bootstrap";

//import './styles.css';

export default class Users extends Component {
  displayName = Users.name;

  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
  }

  componentDidMount = () => {
    fetch("api/user/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.users });
      });
  }


  renderUserTable = (user) => {
    return (
      <div className="users" key={user.id}>
        <p>Name: {user.name}</p>
        <p>Surname: {user.surname}</p>
        <p>Email: {user.email}</p>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    );
  }

  render = () => {
    let cards = this.state.users ? (this.state.users.map(user => this.renderUserTable(user))) : <div>Loading...</div>;
    return (
      <div>
        <h1>Users</h1>
        <p>Here you can see your Users in this semester</p>
        {cards}
        <Button>Add new user</Button>
      </div>
    );
  }
}
