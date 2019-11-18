import React, {Component} from 'react';
import Channel from './Channel';
import PropTypes from 'prop-types';


class ChannelList extends Component{
    render(){
        return (
            <ul>
                {
                    this.props.channels.map( channel => {
                        return(<Channel channel={channel} key={channel.name}{...this.props}/>)
                    })
                }
            </ul>
        )
    }
}

ChannelList.propTypes = {
    channels: PropTypes.array,
    setChannel: PropTypes.func,
    activeChannel: PropTypes.object
}

export default ChannelList