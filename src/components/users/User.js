import React, { Fragment, useEffect } from 'react';
import Loading from '../layout/Loading';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
 
const User = ({user, loading, getUser, getUserRepos, repos, match}) => {
    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //eslint-disable-next-line
    }, []);
    
    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        company,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;



    if(loading) return <Loading/>

    return (
        <Fragment>
            <Link to='/' className='btn btn-dark'>Back</Link>
            Hireable: {''}
            {hireable ? (<i className='fas fa-check text-success'/>):
            (<i className='fas fa-times-circle text-danger'/>)}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} className='round-img' alt='' style={{width: '150px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div className=''>
                    {bio && (<Fragment>
                        <h3>Bio:</h3>
                        <pp>{bio}</pp>
                    </Fragment>)}
                    <a href={html_url} className='btn btn-dark my-1'>GitHub</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username:  </strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company:  </strong> {company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>Website:  </strong> <a href={blog}>{blog}</a>
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-danger'>Followers: {followers}</div>
                <div className='badge badge-warning'>Following: {following}</div>
                <div className='badge badge-success'>Repos: {public_repos}</div>
                <div className='badge badge-info'>Gists: {public_gists}</div>
            </div>
            <div className='card text-center'>
                            <h3> {name}'s Repos:</h3>
            </div>
            <Repos repos={repos} />
        </Fragment>
        
    )

};

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
};

export default User
