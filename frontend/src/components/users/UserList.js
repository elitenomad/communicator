import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User';

class UserList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.users.map((user, index) => {
                        return (
                            <User
                                key={index}
                                user={user}
                            />
                        )
                    })
                }
            </ul>
        )
    }
}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList