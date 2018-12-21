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
            <Glyphicon glyph='education' /> Мои курсы
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/themes'}>
          <NavItem>
            <Glyphicon glyph='education' /> Темы
          </NavItem>
        </LinkContainer>
      <LinkContainer to={'/tasks'} exact>
          <NavItem>
            <Glyphicon glyph='th-list' /> Задания
          </NavItem>
        </LinkContainer>

        <LinkContainer to={'/users'} exact>
          <NavItem>
            <Glyphicon glyph='th-list' /> Пользователи
          </NavItem>
        </LinkContainer>

        <LinkContainer to={'/signin'} exact>
          <NavItem>
            <Glyphicon glyph='th-list'></Glyphicon> Войти в систему
          </NavItem>
        </LinkContainer>

        <LinkContainer to={'/login'} exact>
          <NavItem>
            <Glyphicon glyph='th-list'></Glyphicon> Регистрация
          </NavItem>
        </LinkContainer>
        
        <LinkContainer to={'/roles'}>
          <NavItem>
            <Glyphicon glyph='th-list'/> Роли
          </NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
