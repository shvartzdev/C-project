import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>Education</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
      <LinkContainer to={'/courses'}>
          <NavItem>
            <Glyphicon glyph='education' /> My Courses
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/themes'}>
          <NavItem>
            <Glyphicon glyph='education' /> Themes
          </NavItem>
        </LinkContainer>
      <LinkContainer to={'/tasks'} exact>
          <NavItem>
            <Glyphicon glyph='th-list' /> Tasks
          </NavItem>
        </LinkContainer>

        <LinkContainer to={'/users'} exact>
          <NavItem>
            <Glyphicon glyph='th-list' /> Users
          </NavItem>
        </LinkContainer>

        <LinkContainer to={'/signin'} exact>
          <NavItem>
            <Glyphicon glyph='th-list'></Glyphicon> Sign In
          </NavItem>
        </LinkContainer>}

        {/* <LinkContainer to={'/fetchdata'}>
        <NavItem>
          <Glyphicon glyph='home'/>Profile
        </NavItem>
        </LinkContainer> */}
        
        <LinkContainer to={'/roles'}>
          <NavItem>
            <Glyphicon glyph='th-list'/> Roles
          </NavItem>
        </LinkContainer>

        {/* <LinkContainer to={'/counter'}>
          <NavItem>
            <Glyphicon glyph='education' /> Counter
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/fetchdata'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Fetch data
          </NavItem>
        </LinkContainer> */}

      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
