import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

class MessageList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.messages.map((message, index) => {
                        console.log("what is message ,", message)
                        return (
                            <Message key={index} message={message} />
                        )
                    })
                }
            </ul>
        )
    }
}

MessageList.propTypes = {
    messages: PropTypes.array.isRequired
}

export default MessageList