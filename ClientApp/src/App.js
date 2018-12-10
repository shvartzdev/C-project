import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
//import Counter from './components/Counter';
import FetchData from './components/FetchData';
import User from './components/Users/User';
import Course from './components/Courses/Course';

export default () => (
  <Layout>
    <Route exact path='/tasks' component={Home} />
    <Route path='/users' component={User}/>
    <Route path='/courses' component={Course} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    
  </Layout>
);
