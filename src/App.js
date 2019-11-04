import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import './App.css';


class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };
  
  // seed initial users
  // async componentDidMount() {
  //   this.setState({loading: true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
  //   this.setState({users: res.data, loading: false});
  // };

  // Search for github users.
  searchUsers = async (text) => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({users: res.data.items, loading: false});

  };

  // Clear users from state.
  clearUsers = () => this.setState({ users: [], loading: false});

  // Set Temp Alert
  setAlert = (message, type) => {
    this.setState({alert: {message, type}})
    setTimeout(() => this.setState({alert: null}), 2000);
  };


  render() {
    const {users, loading} = this.state;

    return (
      <div className='App'>
        <Navbar title='Hub Crawler' icon='fab fa-github' /> 
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={users.length > 0 ? true: false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users}/>
        </div>

        
        
      </div>
    );
  }
};

export default App;
