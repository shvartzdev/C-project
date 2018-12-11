import React, { Component } from 'react';
import {
    Button, Table,
    Badge, ButtonToolbar, Modal, Form, ControlLabel,
    FormGroup,
    InputGroup,
    FormControl
} from "react-bootstrap";


export default class AddRoleModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.toggleCreationModel = this.toggleCreationModel.bind(this);
        
        this.state = {
            roles: null,
            role: {
                "Name": ""
            },
            showCreationModal: false
        }
    }

    toggleCreationModel() {
        const { showCreationModal } = this.state;
        this.setState({ showCreationModal: !showCreationModal })
    }

    handleFormChange = (value, field) => {
        //console.log("onChange", value, field)
        this.setState(prevState => ({
            role: {
                ...prevState.role,
                [field]: value
            }
        }));
        console.log("state.role", this.state.role);
    }

    handleAdd = () => {
        console.log("role", this.state.role);
        fetch("api/role/create", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.role)
        })
            .then(response => response.json())
            .then(data => {
                console.log("after", data);
                this.setState({ roles: data.roles });
            })
    }

    render = () => {
        return (
            <div>
                <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.toggleCreationModel}>
                        Add new role
            </Button>

                    <Modal
                        show={this.state.showCreationModal}
                        onHide={this.toggleCreationModel}
                        dialogClassName="custom-modal">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">
                                Role creation
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

                                <Button onClick={this.handleAdd} >
                                    New role
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