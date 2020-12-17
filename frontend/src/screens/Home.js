import React from 'react';
import {View, Text, FlatList, TextInput, Button} from 'react-native';
import io from 'socket.io-client';

class Home extends React.Component {

state ={
  message: '',
  messages: []
}
  componentDidMount() {
    this.socket = io('http://127.0.0.1:3000');
    this.socket.on('chat', (msn) =>{
      console.log(this.state)
      this.setState({messages: [...this.state.messages, msn]});
    })
  }

  submit() {
    this.socket.emit('chat', this.state.message);
    this.setState({message: ''});
  }
  render () {
    return (<View style={{flex: 1}}>
      <FlatList 
        style={{backgroundColor: 'yellow'}}
        data= {this.state.messages}
        renderItem= {({item}) => (
          <View>
            <Text>{String(item)}</Text>
            </View>
        )}
      />
      <TextInput 
        style={{height: 40, borderWidth: 2}}
        value={this.state.message}
        onChangeText ={(message) => {
          this.setState({message});
        }}/>
        <Button title= "send" onPress={this.submit.bind(this)} />
    </View>)
  }
}

export default Home;