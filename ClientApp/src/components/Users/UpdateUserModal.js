import React, { Component } from 'react';
import {
    Button, Table,
    Badge, ButtonToolbar, Modal,Form, ControlLabel,
    FormGroup,
    InputGroup,
    FormControl
  } from "react-bootstrap";

export  default class UpdatedUserModal extends Component {
   

    constructor(props, context) {
        super(props, context);

       
        this.state = {
            users: null,
            user: {
                Name: "",
                Surname: "",
                Email: "",
                RoleID: ""
            },
            showUpdationModal: false
        }
    }

   

    



      renderModal = (user) => {
        
      }  

    render = (users) => {
        console.log(this.state.users);
        let modal = this.state.users ? (this.state.users.map(user => this.renderModal(user))) : <Button bsStyle="link">Edit</Button>;

        return (
            <div>
                {modal}
            </div>
        )
    }
}