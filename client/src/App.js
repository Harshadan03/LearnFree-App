import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import AdminDashboard from './components/dashboard/AdminDashboard'
import UserDashboard from './components/dashboard/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import ExploreCourses from './components/courses/ExploreCourses'
import SingleCourse from './components/singleCourse/SingleCourse'
import AddExtraDetails from './components/dashboard/AddExtraDetails';
import ResumeCourse from './components/dashboard/ResumeCourse';
import AddCategory from './components/dashboard/AddCategory';

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/addcategory" exact component={AddCategory} />
        <AdminRoute path="/addextraInfo" exact component={AddExtraDetails} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/user/resumecourse/:courseId" exact component={ResumeCourse} />
        <Route path="/explore-courses" exact component={ExploreCourses} />
        <Route path="/view-course/:courseId" exact component={SingleCourse} />
      </Switch>
    </BrowserRouter>
  )

}

export default App;
