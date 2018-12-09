import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Courses extends Component {
  displayName = Courses.name;

  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };
  }

  componentDidMount = () => {
    fetch("api/course/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        this.setState({ courses: data.courses });
      });
  }

  renderCourseTable = (course) => {
    return (
      <div className="course" key={course.id}>
        <h1>{course.name}</h1>
        <p>Duration: </p>
        <p>Description: </p>
      </div>
    );
  }

  render = () => {
    let cards = this.state.courses ? (this.state.courses.map(course => this.renderCourseTable(course))) : <div className="loader">Loading...</div>;
    return (
      <div>
        <h1>Courses</h1>
        <p>Here you can see your courses in this semester</p>
        {cards}
        <p>There're {Math.floor(Math.random() * 10)} courses here</p>
        <p>There're {Math.floor(Math.random() * 40)} materials here</p>
        <p>There're {Math.floor(Math.random() * 100)} tasks here</p>
      </div>
    );
  }
}
