import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        const node = this.refs.message;
        const message = {
            body: node.value,
            author: 'Pranava',
            createdAt: new Date()
        };
        this.props.addMessage(message);
        node.value = '';
    }
    render() {
        let input;
        if (this.props.activeChannel.name !== undefined) {
            input = (
                <input
                    ref='message'
                    type='text'
                    className='form-control'
                    placeholder='Add Message...'
                />
            )
        }

        return (
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    {input}
                </div>
            </form>
        )
    }
}

MessageForm.propTypes = {
    activeChannel: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
}

export default MessageForm