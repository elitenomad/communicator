import React from 'react';
import ChannelSection from './components/channels/ChannelSection';
import UserSection from './components/users/UserSection';
import MessageSectoion from './components/messages/MessageSection';
import Socket from './Socket'
import { timingSafeEqual } from 'crypto';
import './App.css';

class App extends React.Component {

  state = {
    channels: [],
    activeChannel: {},
    users: [],
    messages: [],
    connected:  false
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let ws =  new WebSocket('ws://echo.websocket.org'); //new WebSocket('ws://localhost:4000')
    let socket = this.socket = new Socket(ws);
    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);
    socket.on('channel add', this.onAddChannel);
    socket.on('user add', this.onAddUser);
    socket.on('user edit', this.onEditUser);
    socket.on('user remove', this.onRemoveUser);
    socket.on('message add', this.onMessageAdd);
  }

  onMessageAdd = (message) => {
    let { messages } = this.state;
    messages.push(message);
    console.log("what are message ", messages)
    this.setState({messages});
  }

  onAddUser = (user) => {
    let {users} = this.state;
    users.push(user);
    this.setState({users});
  }

  onEditUser = (editUser) => {
    let {users} = this.state;
    users = users.map(user => {
      if(editUser.id === editUser.id){
        return editUser
      }
      return user
    })
    this.setState({users});
  }

  onRemoveUser = (removeUser) => {
    let {users} = this.state;
    users = users.filter(user => {
      return user.id !== removeUser.id
    });
    this.setState({users});
  }
  onConnect = () => {
    this.setState({connected: true});
    this.socket.emit('channel subscribe');
  }
  onDisconnect = () => {
    this.setState({connected: false});
  }

  onAddChannel = (channel) => {
    let {channels} = this.state;
    channels.push(channel);
    this.setState(channels);
  }

  addChannel = (name) => {
    this.socket.emit('channel add', {name})
  }

  setChannel = (activeChannel) => {
    this.setState({ activeChannel });
    this.socket.emit('message unsubscribe');
    this.setState({messages :[]});
    this.socket.emit('message subscribe', {channelId: activeChannel.id});
  }

  setUserName = (name) => {
    this.socket.emit('user add', {name});
  }

  addMessage = (body) => {
    let {activeChannel} = this.state;
    this.socket.emit('message add', {channelId: activeChannel.id, body});
  }

  render(){
    return (
        <div className='app'>
          <div className='nav'>
            <ChannelSection
                {...this.state}
                addChannel={this.addChannel}
                setChannel={this.setChannel}
            />

            <UserSection{...this.state} setUserName={this.setUserName}/>
          </div>
          <MessageSectoion {...this.state} addMessage={this.addMessage}/>
        </div>
    )
  }
}

export default App
