import React, { Component } from 'react';
import './styles.css';
import {
    Button, Modal, ButtonToolbar,
    Form, ControlLabel,
    FormGroup,
    FormControl
} from "react-bootstrap";
import './styles.css';


export default class Task extends Component {
    constructor(props, context) {
        super(props, context);


        this.handleAdd = this.handleAdd.bind(this);
        this.toggleCreationModel = this.toggleCreationModel.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.toggleUpdationModel = this.toggleUpdationModel.bind(this);

        this.state = {

            tasks: null,
            task: {

                TaskQuestion: "",
                ThemeId: "",
                TaskAnswer: ""
            },
            showCreationModal: false,
            showUpdationModal: false
        }
    }


    componentDidMount = () => {
        fetch("api/task/getall", { dataType: 'json' })
            .then(response => response.json())
            .then(data => {
                this.setState({ tasks: data.tasks });
            });
    }




    handleAdd = () => {
        fetch("api/task/create", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.task)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ tasks: data.tasks });
            })
    };

    toggleCreationModel() {
        const { showCreationModal } = this.state;
        this.setState({ showCreationModal: !showCreationModal })
    }

    toggleUpdationModel() {
        const { showUpdationModal } = this.state;
        this.setState({ showUpdationModal: !showUpdationModal })
    }

    renderTaskBlock = (task) => {

        return (
            <div className="course-large" key={task.taskId}>
                <p><strong>ID </strong>{task.taskId} <strong>TaskQuestions </strong>{task.taskQuestion}</p>
                
                <Button bsStyle="default" onClick={() => this.setState({showUpdationModal: task.taskId})}>Edit</Button>
                {/* <Button bsStyle="primary">Answer</Button> */}

                <Modal

                    show={this.state.showUpdationModal === task.taskId}
                    onHide={this.toggleUpdationModel}
                    dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Task Update
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"  "}
                        <Form>
                            <FormGroup>
                                <ControlLabel>{task.taskQuestion}</ControlLabel>{" "}
                                <FormControl
                                    type="text"
                                    placeholder={task.taskQuestion}
                                    onChange={event => this.handleFormChange(event.target.value, "TaskQuestion")}
                                />{" "}
                            </FormGroup>{" "}

                            <FormGroup>
                                <ControlLabel>{task.themeId}</ControlLabel>{" "}

                                <FormControl
                                    type="text"
                                    placeholder={task.themeId}
                                    onChange={event => this.handleFormChange(event.target.value, "ThemeId")}
                                />{" "}
                            </FormGroup>{" "}



                            <Button onClick={() => this.handleUpdate(task.taskId)}>Save Changes</Button>
                        </Form>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleUpdationModel}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Button bsStyle="default" onClick={() => this.handleDelete(task.taskId)}>Delete</Button>
            </div>
        )
    }

    handleFormChange = (value, field) => {
        console.log("onChange", value, field)
        this.setState(prevState => ({
            task: {
                ...prevState.task,
                [field]: value
            }
        }));
        console.log(this.state.task);
    }

    handleDelete = (taskId) => {
        console.log("id", taskId);
        if (!window.confirm("Are you sure you want to delete the task?")) return;
        fetch("api/task/delete/" + taskId, { method: "delete" })
            .then(responce => responce.json())
            .then(data => {
                console.log(data);
                this.setState({ tasks: data.tasks })
            })
    }


    handleUpdate = (taskId) => {
        let taskDTO = this.state.task;
        taskDTO = { ...taskDTO, taskId: taskId };
        fetch("api/task/edit/" + taskId, {
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskDTO)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ tasks: data.tasks });
            })
    }


    render = () => {

        let tasks = this.state.tasks ? (this.state.tasks.map(task => this.renderTaskBlock(task))) : <div>Loading</div>;
        return (
            <div>
                <div >
                    <div className="course-flex">
                        {tasks}
                    </div>

                </div>
                <Button bsStyle="primary" onClick={this.toggleCreationModel}>Add new task</Button>

                <Modal
                    show={this.state.showCreationModal}
                    onHide={this.toggleCreationModel}
                    dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Task creation
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"  "}
                        <Form inline>
                            <FormGroup>
                                <ControlLabel>TaskQuestion</ControlLabel>{" "}
                                <FormControl
                                    type="text"
                                    placeholder="Enter name of task"
                                    onChange={event => this.handleFormChange(event.target.value, "TaskQuestion")}
                                />{" "}
                            </FormGroup>{" "}
                            <FormGroup>
                                <ControlLabel>ThemeId</ControlLabel>{" "}
                                <FormControl
                                    type="text"
                                    placeholder="CourseId"
                                    onChange={event => this.handleFormChange(event.target.value, "ThemeId")} />
                            </FormGroup>{" "}


                            <Button onClick={this.handleAdd} >
                                New theme
          </Button>
                        </Form>
                        <br />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleCreationModel}>Close</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}