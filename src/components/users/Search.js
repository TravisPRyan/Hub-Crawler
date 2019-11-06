import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
    state = {
        text: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };
    
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    };
    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please enter keywords to search', 'danger')
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({text: ''});
        };

    };
    render() {
        const {showClear, clearUsers} = this.props;
        
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input 
                        type='text' 
                        name='text' 
                        placeholder='Find Users...' 
                        value={this.state.text}
                        onChange={this.onChange} />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                {showClear && (<button className='btn btn-dark btn-block' onClick={clearUsers}>Clear</button>)}
                
            </div>
        )
    };
};

export default Search
