import React, { Component } from 'react';

import {
  Button, Modal, ButtonToolbar,
  Form, ControlLabel,
  FormGroup,
  FormControl
} from "react-bootstrap";

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: props.data,
            task: {
                TaskQuestion: ""
            }
        };
    } 

    componentDidMount = () => {
        // fetch("api/task/getall", {dataType: 'json'})
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     this.setState({tasks: data.tasks})
        // })
    }

    renderTaskList = (task) => 
        <div>
            <div key={task.taskID}>
                <p><strong>Number:</strong>{task.taskId}
                <strong>  Question:</strong> {task.taskQuestion}</p>
            </div>
        </div>
    

    render = () => {
        let tasks = this.state.tasks ? (this.state.tasks.map(task => this.renderTaskList(task))) : <div>Loading...</div>;
        return (
            <div>
            {/* <p>Tasks should be here</p> */}
                {tasks}
            </div>
        )
    }
}