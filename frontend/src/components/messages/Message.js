import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    render() {
        let {message} =  this.props;
        let createdAt = Date.parse(message.createdAt, 'HH:mm:ss MM/DD/YYYY')
        return (
            <li className='message'>
                <div className='author'>
                    <strong>{message.body.author}</strong>
                    <i className='timestamp'>{message.body.createdAt}</i>
                </div>
                <div className='body'>{message.body.body}</div>
            </li>
        )
    }
}

Message.propTypes = {
    message: PropTypes.object.isRequired
}

export default Message;