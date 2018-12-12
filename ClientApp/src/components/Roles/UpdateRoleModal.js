import React, { Component } from 'react';
import {
  Button, Table,
  Badge, ButtonToolbar, Modal,Form, ControlLabel,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";

export default class UpdateRoleModal extends Component {
    constructor(props,context) {
        super(props, context);


        this.handleFormChange = this.handleFormChange.bind(this);
        this.toggleUpdationModel = this.toggleUpdationModel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
       
        this.state = {
            roles: null,
            role: {
              "Name": ""
            },
            showUpdationModal: false
        }

    }

    toggleUpdationModel() {
        const {showUpdationModal} = this.state;
        this.setState({showUpdationModal: !showUpdationModal})
    }
    

    handleUpdate = (roleId) => {
        console.log("from handleUpdate", roleId);
        let roleDTO = this.state.role;
        roleDTO = { ...roleDTO, roleId: roleId };
        fetch("api/role/edit/" + roleId, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(roleDTO)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({ roles: data.roles });
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

    render = () => {
        return (
            <div>
                <Button onClick={() => this.setState({showUpdationModal: this.props.roleID})}>Edit</Button>

                <Modal
                    show={this.state.showUpdationModal === this.props.roleID}
                    onHide = {this.toggleUpdationModel}
                    dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Role Updation
                    {console.log("call ",this.props.roleID)}
                    {console.log("name", this.props.role.Name)}
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        {" "}
                        <Form inline>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>{" "}
                                <FormControl
                                type="text"
                                placeholder={this.props.role.name}
                                onChange={event => this.handleFormChange(event.target.value, "Name")}
                                >
                                </FormControl>
                            </FormGroup>
                        </Form>
                        <br/>
                        <Button onClick={() => this.handleUpdate(this.props.roleID)}>Save changes</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleUpdationModel}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}