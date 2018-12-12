import React, { Component } from 'react';

import {
  Button, Modal, ButtonToolbar,
  Form, ControlLabel,
  FormGroup,
  FormControl
} from "react-bootstrap";

export default class Themes extends Component {
    constructor(props) {
        super(props);


        this.state= {
            themes: props.data,
            theme: {
                Name: ""
            }
        };
    }

    componentDidMount = () =>  {
        // fetch("api/theme/getall", {dataType: 'json'})
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         this.setState({themes: data.themes});
        //     });
    }

    renderThemeList = (theme) => 
    <div>
        <div key={theme.themeID}>
            <p>{theme.themeName}</p>
        </div>
    </div>

    render =() => {
        let themes = this.state.themes ? (this.state.themes.map(theme => this.renderThemeList(theme))) : <div>Loading...</div>;

        return (
        <div>
            <p>Theme names will be here</p>
            {themes}
        </div>
    
        )
    }
}