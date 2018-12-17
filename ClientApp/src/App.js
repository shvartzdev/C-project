import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
//import Home from './components/Home';
//import Counter from './components/Counter';
import FetchData from './components/FetchData';
import User from './components/Users/User';
import Course from './components/Courses/Course';
import Role from './components/Roles/Role';
import Task from './components/Courses/Task';
import Coursetest from './components/Courses/Coursetest';
import Themes from './components/Courses/Themes';


export default () => (
  <Layout>
    <Route exact path='/tasks' component={Task} />
    <Route path='/users' component={User}/>
    <Route path='/courses' component={Course} />
    <Route path='/coursestest' component={Coursetest}/>
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/roles' component={Role}/>
    <Route path='/themes' component={Themes}/>
  </Layout>
);
