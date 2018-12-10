import React, { Component } from 'react';

import {
  Button, Modal, ButtonToolbar,
  Form, ControlLabel,
  FormGroup,
  FormControl
} from "react-bootstrap";

import './styles.css';

export default class Courses extends Component {
  displayName = Courses.name;

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShowCreationModal = this.handleShowCreationModal.bind(this);
    this.handleHideCreationModal = this.handleHideCreationModal.bind(this);
    this.handleHideUpdateModel = this.handleHideUpdateModel.bind(this);
    this.handleShowUpdationModel = this.handleShowUpdationModel.bind(this);
    this.toggleUpdateModal = this.toggleUpdateModal.bind(this);

    this.state = {
      courses: null,
      course: {
        Name: "",
        Duration: "",
        Description: ""
      },
      show: false,
      showCreationModal: false,
      showUpdationModal: false
    };
  }

  componentDidMount = () => {
    fetch("api/course/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ courses: data.courses });
      });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  handleShowCreationModal() {
    this.setState({ showCreationModal: true });
  }

  handleHideCreationModal() {
    this.setState({ showCreationModal: false });
  }

  handleShowUpdationModel() {
    this.setState({ showUpdationModal: true });
  }

  handleHideUpdateModel() {
    console.log("before", this.state);
    this.setState({ showUpdationModal: false });
    console.log("after", this.state);
  }

  toggleUpdateModal() {
    const {showUpdationModal} = this.state;
    this.setState({ showUpdationModal: !showUpdationModal})
  }

  handleAdd = () => {
    fetch("api/course/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.course)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ courses: data.courses });
      })
  };

  handleUpdate = (courseId) => {
    let courseDTO = this.state.course;
    courseDTO = {...courseDTO, CourseId: courseId};
    fetch("api/course/edit/" + courseId,{
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(courseDTO)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({courses: data.courses});
    })
  }

  handleDelete = (courseId) => {
    console.log("id", courseId);
    if (!window.confirm("Are you sure you want to delete the course?")) return;
    fetch("api/course/delete/" + courseId, { method: "delete" })
      .then(responce => responce.json())
      .then(data => {
        console.log(data);
        this.setState({ courses: data.courses })
      })
  }

  handleFormChange = (value, field) => {
    console.log("onChange", value, field)
    this.setState(prevState => ({
      course: {
        ...prevState.course,
        [field]: value
      }
    }));
    console.log(this.state.course);
  }


  renderCourseTable = (course) => 
      <div>
        <div className="course" key={course.courseId}>
          <h1>{course.name}</h1>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Description:</strong> {course.description}</p>

          <ButtonToolbar>
            <Button bsStyle="primary" onClick={() => this.setState({ show: course.courseId })}>
              Show more
            </Button>
            <Modal
              //{...this.props}
              show={this.state.show === course.courseId}
              onHide={this.handleHide}
              // container={this}
              // aria-labelleby="contained-modal-title"
              dialogClassName="custom-modal">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                  {course.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{course.description}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleHide}>Close</Button>
              </Modal.Footer>
            </Modal>


            <Button onClick={() => this.setState({ showUpdationModal: course.courseId })}>Edit</Button>
            
            <Modal
            
              show={this.state.showUpdationModal === course.courseId}
              onHide={this.handleHideUpdateModel}
              dialogClassName="custom-modal">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">
                  Course Update
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {"  "}
                <Form inline>
                  <FormGroup>
                    <ControlLabel>Name</ControlLabel>{" "}
                    <FormControl
                      type="text"
                      placeholder={course.name}
                      onChange={event => this.handleFormChange(event.target.value, "Name")}
                    />{" "}
                  </FormGroup>{" "}
                  <FormGroup>
                    <ControlLabel>Duration</ControlLabel>{" "}
                    <FormControl
                      type="text"
                      placeholder={course.duration}
                      onChange={event => this.handleFormChange(event.target.value, "Duration")}
                    />{" "}
                  </FormGroup>{" "}
                  <FormGroup>
                    <ControlLabel>Description</ControlLabel>{" "}
                    <FormControl
                      type="text"
                      placeholder={course.description}
                      onChange={event => this.handleFormChange(event.target.value, "Description")}
                    />{" "}
                  </FormGroup>{" "}

                  <Button onClick={() => this.handleUpdate(course.courseId)}>Save Changes</Button>
                </Form>
                <br />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.handleHideUpdateModel()}>Close</Button>
              </Modal.Footer>
            </Modal>


            <Button onClick={() => this.handleDelete(course.courseId)}>Delete</Button>

          </ButtonToolbar>


        </div>
      </div>


  render = () => {
    let cards = this.state.courses ? (this.state.courses.map(course => this.renderCourseTable(course))) : <div>Loading...</div>;
    return (
      <div>
        <h1>Courses</h1>
        <p>Here you can see your courses in this semester</p>
        <div className="dasha-flex">
          {cards}
        </div>
        <p>There're {Math.floor(Math.random() * 10)} courses here</p>
        <p>There're {Math.floor(Math.random() * 40)} materials here</p>
        <p>There're {Math.floor(Math.random() * 100)} tasks here</p>
        {/* <Button bsStyle="link" onClick={() => this.handleAdd}>Add new course</Button> */}

        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.handleShowCreationModal}>
            Add new course
            </Button>

          <Modal
            show={this.state.showCreationModal}
            onHide={this.handleHideCreationModal}
            dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                Course creation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {"  "}
              <Form inline>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>{" "}
                  <FormControl
                    type="text"
                    placeholder="Enter name of course"
                    onChange={event => this.handleFormChange(event.target.value, "Name")}
                  />{" "}
                </FormGroup>{" "}
                <FormGroup>
                  {/* <ControlLabel>Description</ControlLabel>{" "} */}
                  <FormControl
                    type="text"
                    placeholder="Duration"
                    onChange={event => this.handleFormChange(event.target.value, "Duration")} />
                </FormGroup>{" "}
                <FormGroup>
                  <ControlLabel>Description</ControlLabel>{" "}
                  <FormControl
                    type="text"
                    placeholder="Enter description"
                    onChange={event => this.handleFormChange(event.target.value, "Description")}
                  />{" "}
                </FormGroup>{" "}

                <Button onClick={this.handleAdd} >
                  New course
          </Button>
              </Form>
              <br />

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHideCreationModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
      </div>
    );
  }
}

