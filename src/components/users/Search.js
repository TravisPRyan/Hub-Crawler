import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ setAlert}) => {
    const githubContext = useContext(GithubContext);


    const [text, setText] = useState('');
    
    const onChange = (event) => {
        setText(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(text === ''){
            setAlert('Please enter keywords to search', 'danger')
        } else {
            githubContext.searchUsers(text);
            setText('');
        };
    };
        
    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input 
                    type='text' 
                    name='text' 
                    placeholder='Find Users...' 
                    value={text}
                    onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {githubContext.users.length > 0  && 
            (<button className='btn btn-dark btn-block' 
            onClick={githubContext.clearUsers}>Clear</button>)}
        </div>
    )
};

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default Search
