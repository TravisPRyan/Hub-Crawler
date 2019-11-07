import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';


class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  };
  
  //seed initial users
  async componentDidMount() {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({users: res.data, loading: false});
  };

  // Search for github users.
  searchUsers = async (text) => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({users: res.data.items, loading: false});

  };

  // Get individual github user
  getUser = async (username) => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({user: res.data, loading: false});
  }

  // Get user repos
  getUserRepos = async (username) => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=20&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({repos: res.data, loading: false});
  }

  // Clear users from state.
  clearUsers = () => this.setState({ users: [], loading: false});

  // Set Temp Alert
  setAlert = (message, type) => {
    this.setState({alert: {message, type}})
    setTimeout(() => this.setState({alert: null}), 2000);
  };


  render() {
    const {users, user, repos, loading} = this.state;

    return (
      <Router>
      <div className='App'>
        <Navbar title='Hub Crawler' icon='fab fa-github' /> 
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route exact path='/' render={props =>(
              <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true: false}
                  setAlert={this.setAlert}
                />
                <Users loading={loading} users={users}/>

              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login'  
            render={props => (
              <User 
                {...props} 
                getUser={this.getUser} 
                getUserRepos={this.getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />

            )}/>
          </Switch>

        </div>
      </div>
      </Router>
    );
  }
};

export default App;
