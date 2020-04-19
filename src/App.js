import React from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import axios from 'axios';
import {__BASE_URL__} from './constants';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        name: null,
        id: null
      }
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEnterPressed = this.handleEnterPressed.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      player: {name: e.target.value}
    });
  }

  handleEnterPressed(e) {
    let name = this.state.player.name
    if (name && name.length > 0) {
      // TODO show loading
      console.log('sending user name ' + name)
      axios.post(__BASE_URL__ + '/players', {
        name: name
      }).then(res => {
        console.log("got: ", res)
        this.setState({
          player: res
        });
      }).catch(err => {
        console.debug(err);
      });
    } else {
      // TODO show error
      console.log('user name is empty');
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Input
            placeholder="Your cool user name"
            value={this.state.player.name}
            onChange={this.handleUsernameChange}
            onPressEnter={this.handleEnterPressed}
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </header>
      </div>
    );
  }
}

export default App;
