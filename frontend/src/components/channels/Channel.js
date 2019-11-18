import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Channel extends Component {
    onClick = (e) => {
        e.preventDefault();
        const {setChannel, channel} = this.props;
        setChannel(channel);
    }
    render(){
        const {channel, activeChannel} = this.props;
        const active = channel === activeChannel ? 'active' : '';

        return (
            <li className={active}>
                <a onClick={this.onClick}>
                    {channel.name}
                </a>
            </li>
        )
    }
}

Channel.propTypes = {
    channel: PropTypes.object,
    setChannel: PropTypes.func,
    activeChannel: PropTypes.object
}

export default Channel