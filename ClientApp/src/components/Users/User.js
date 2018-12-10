import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Badge,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";

import './styles.css';

export default class Users extends Component {
  displayName = Users.name;

  constructor(props) {
    super(props);
    this.state = {
      Users: null
    };
  }

  componentDidMount = () => {
    fetch("api/users/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        this.setState({ Users: data.Users });
      });
  }


  renderCourseTable = (user) => {
    return (
      <div className="users" key={user.id}>
        <h1>{user.name}</h1>
        <p>{user.surname}</p>
        <p>{user.email}</p>
        <Button>Show more</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    );
  }

//   render = () => {
//     let cards = this.state.Users ? (this.state.Users.map(course => this.renderCourseTable(course))) : <div>Loading...</div>;
//     return (
//       <div>
//         <h1>Users</h1>
//         <p>Here you can see your Users in this semester</p>
//         {cards}
//         <p>There're {Math.floor(Math.random() * 10)} Users here</p>
//         <p>There're {Math.floor(Math.random() * 40)} materials here</p>
//         <p>There're {Math.floor(Math.random() * 100)} tasks here</p>
//         <Button>Add new course</Button>
//       </div>
//     );
//   }
}
