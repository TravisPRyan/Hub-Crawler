import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
 

  // Search for github users.


  // Get individual github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(res.data);
    setLoading(false);
  }

  // Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=20&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(res.data);
    setLoading(false);
  }

  // Clear users from state.
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  // Set Temp Alert
  const dispAlert = (message, type) => {
    setAlert({message, type})
    setTimeout(() => (null), 2000);
  };


  return (
    <GithubState>
    <Router>
    <div className='App'>
      <Navbar title='Hub Crawler' icon='fab fa-github' /> 
      <div className='container'>
        <Alert alert={alert} />
        <Switch>
          <Route exact path='/' render={props =>(
            <Fragment>
              <Search 
                
                clearUsers={clearUsers} 
                showClear={users.length > 0 ? true: false}
                setAlert={dispAlert}
              />
              <Users loading={loading} users={users}/>

            </Fragment>
          )}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login'  
          render={props => (
            <User 
              {...props} 
              getUser={getUser} 
              getUserRepos={getUserRepos}
              user={user}
              repos={repos}
              loading={loading}
            />

          )}/>
        </Switch>

      </div>
    </div>
    </Router>
    </GithubState>
  );
};

export default App;
