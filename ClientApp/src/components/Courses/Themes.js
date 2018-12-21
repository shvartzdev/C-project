import React, { Component } from 'react';

import {
  Button, Modal, ButtonToolbar,
  Form, ControlLabel,
  FormGroup,
  FormControl
} from "react-bootstrap";
import './styles.css';

export default class Themes extends Component {
  constructor(props) {
    super(props);

    this.toggleUpdationModel = this.toggleUpdationModel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.toggleCreationModel = this.toggleCreationModel.bind(this);


      this.state = {
        themes: null,
        theme: {
          ThemeName: "",
          CourseId: ""
        },
        showCreationModal: false,
        showUpdationModal: false
      };
  }





  componentDidMount = () => {
    fetch("api/theme/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        console.log("themes", data);
        this.setState({ themes: data.themes });
      })
  }

  handleAdd = () => {
    fetch("api/theme/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.theme)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ themes: data.themes });
      })
  };

  handleUpdate = (themeID) => {
    let themeDTO = this.state.theme;
    themeDTO = { ...themeDTO, themeID: themeID };
    fetch("api/theme/edit/" + themeID, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(themeDTO)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ themes: data.themes });
      })
  }

  handleDelete = (themeID) => {
    console.log("id", themeID);
    if (!window.confirm("Вы уверены, что хотите удалить эту тему?")) return;
    fetch("api/theme/delete/" + themeID, { method: "delete" })
      .then(responce => responce.json())
      .then(data => {
        console.log(data);
        this.setState({ themes: data.themes })
      })
  }

  toggleUpdationModel() {
    const { showUpdationModal } = this.state;
    this.setState({ showUpdationModal: !showUpdationModal })
  }

  toggleCreationModel() {
    const { showCreationModal } = this.state;
    this.setState({ showCreationModal: !showCreationModal })
  }

  handleFormChange = (value, field) => {
    console.log("onChange", value, field)
    this.setState(prevState => ({
      theme: {
        ...prevState.theme,
        [field]: value
      }
    }));
    console.log(this.state.theme);
  }

  renderThemeBlock = (theme) => {
    return (
      <div className="course" key={theme.themeID}>
        {/* <p>ThemeID: {theme.themeID}</p> */}
        <p>Тема: {theme.themeName}</p>
        {/* <p>CourseId:{theme.courseId}</p> */}

        <Button bsStyle="default" onClick={() => this.setState({showUpdationModal: theme.themeID})}>Изменить</Button>

        <Modal

          show={this.state.showUpdationModal === theme.themeID}
          onHide={this.toggleUpdationModel}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Редактирование темы
                    </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"  "}
            <Form>
            <FormGroup>
                <ControlLabel>{theme.themeName}</ControlLabel>{" "}
                <FormControl
                  type="text"
                  placeholder={theme.themeName}
                  onChange={event => this.handleFormChange(event.target.value, "ThemeName")}
                />{" "}
              </FormGroup>{" "}

              {/* <FormGroup>
                <ControlLabel>{theme.cousreId}</ControlLabel>{" "}

                <FormControl
                  type="text"
                  placeholder={theme.courseId}
                  onChange={event => this.handleFormChange(event.target.value, "CourseId")}
                />{" "}
              </FormGroup>{" "} */}

              

              <Button onClick={() => this.handleUpdate(theme.themeID)}>Сохранить изменения</Button>
            </Form>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleUpdationModel}>Закрыть</Button>
          </Modal.Footer>
        </Modal>



        <Button bsStyle="default" onClick={() => this.handleDelete(theme.themeID)}>Удалить</Button>
      </div>
    )
  }


  render = () => {

    let themes = this.state.themes ? (this.state.themes.map(theme => this.renderThemeBlock(theme))) : <div>Loading...</div>;
    return (
      <div>
        <div className="course-flex">
          {themes}
          
        </div>
        <Button bsStyle="primary" onClick={this.toggleCreationModel}>Добавить новую тему</Button>

          <Modal
          show={this.state.showCreationModal}
          onHide={this.toggleCreationModel}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Theme creation
                </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {"  "}
            <Form inline>
              <FormGroup>
                <ControlLabel>Themename</ControlLabel>{" "}
                <FormControl
                  type="text"
                  placeholder="Enter name of theme"
                  onChange={event => this.handleFormChange(event.target.value, "ThemeName")}
                />{" "}
              </FormGroup>{" "}
              <FormGroup>
                <ControlLabel>CourseId</ControlLabel>{" "}
                <FormControl
                  type="text"
                  placeholder="CourseId"
                  onChange={event => this.handleFormChange(event.target.value, "CourseId")} />
              </FormGroup>{" "}


              <Button onClick={this.handleAdd} >
                Новая тема
          </Button>
            </Form>
            <br />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleCreationModel}>Закрыть</Button>
          </Modal.Footer>
        </Modal>



      </div>
    )
  }
}