import React, { Component } from 'react';
import UserItem from './UserItem';
class Users extends Component {
    state = {
        users: [
            {
                id: '1',
                login: 'yasserf1',
                avatar_url: 'https://avatars3.githubusercontent.com/u/2734923?s=400&v=4',
                html_url: 'https://github.com/yasserf'

            },
            {
                id: '2',
                login: 'yasserf2',
                avatar_url: 'https://avatars3.githubusercontent.com/u/2734923?s=400&v=4',
                html_url: 'https://github.com/yasserf'

            },
            {
                id: '3',
                login: 'yasserf3',
                avatar_url: 'https://avatars3.githubusercontent.com/u/2734923?s=400&v=4',
                html_url: 'https://github.com/yasserf'

            },
            {
                id: '4',
                login: 'yasserf4',
                avatar_url: 'https://avatars3.githubusercontent.com/u/2734923?s=400&v=4',
                html_url: 'https://github.com/yasserf'

            },
            {
                id: '5',
                login: 'yasserf5',
                avatar_url: 'https://avatars3.githubusercontent.com/u/2734923?s=400&v=4',
                html_url: 'https://github.com/yasserf'

            },
            {
                id: '6',
                login: 'yasserf6',
                avatar_url: 'https://avatars3.githubusercontent.com/u/2734923?s=400&v=4',
                html_url: 'https://github.com/yasserf'

            }

        ]
    };
    render() {
        return (
            <div style={userStyle}> 
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
export default Users
