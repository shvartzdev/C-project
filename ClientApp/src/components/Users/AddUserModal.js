import React, { Component } from 'react';
import {
    Button, Table,
    Badge, ButtonToolbar, Modal,Form, ControlLabel,
    FormGroup,
    InputGroup,
    FormControl
  } from "react-bootstrap";

export  default class AddUserModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.toggleCreationModel = this.toggleCreationModel.bind(this);

        this.state = {
            users: null,
            user: {
                Name: "",
                Surname: "",
                Email: "",
                RoleID: ""
            },
            showCreationModal: false
        }
    }

    toggleCreationModel() {
        const {showCreationModal} = this.state;
        this.setState({showCreationModal: !showCreationModal})
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
    


      handleAdd = () => {
          console.log("user",this.state.user);
        fetch("api/user/create", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(this.state.user)
        })
        .then(response => response.json())
        .then(data => {
          console.log("after",data);
          this.setState({ users: data.users });
        })
      }

    render = () => {
        return (
            <div>
            <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.toggleCreationModel}>
                    Add new user
            </Button>

                <Modal
                    show={this.state.showCreationModal}
                    onHide={this.toggleCreationModel}
                    dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            User creation
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"  "}
                        <Form inline>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>{" "}
                                <FormControl
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={event => this.handleFormChange(event.target.value, "Name")}
                                   
                                />{" "}
                                 
                            </FormGroup>{" "}
                            <FormGroup>
                                <ControlLabel>Surname</ControlLabel>{" "}
                                <FormControl
                                    type="text"
                                    placeholder="Enter Surname"
                                    onChange={event => this.handleFormChange(event.target.value, "Surname")}
                                     />
                                    
                            </FormGroup>{" "}
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>{" "}
                                <FormControl
                                    type="text"
                                    placeholder="Enter email"
                                    onChange={event => this.handleFormChange(event.target.value, "Email")}
                                />{" "}
                            </FormGroup>{" "}
                            <FormGroup>
                                <ControlLabel>RoleId</ControlLabel>
                                <FormControl
                                type="text"
                                placeholder="enter roleID"
                                onChange={event => this.handleFormChange(event.target.value, "RoleID")}
                                />{" "}
                            </FormGroup>
                            <Button onClick={this.handleAdd} >
                                New user
          </Button>
                        </Form>
                        <br />
                        

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleCreationModel}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
            </div>
        )
    }
}