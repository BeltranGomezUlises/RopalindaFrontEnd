import React from 'react';
import { Route, Link, HashRouter } from 'react-router-dom';
import { Button, Container, Divider,  Dropdown,  Header,  Message,
  Segment,  Menu, Icon, Sidebar, Image } from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
// app_modules

import HomepageHeading from './app_modules/Layouts/HomePageHeading.jsx';
import HomePageLayout from './app_modules/Layouts/HomePageLayout.jsx';
import Login from './app_modules/Login.jsx';
import config from './config.json';

const App =()=>(
    <HashRouter>
        <MainContainer></MainContainer>
    </HashRouter>
)

class MainContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {menuVisible: true};
  }

  renderMainContent(){
      return(
        <div>
             <Route path="/home" component={HomePageLayout}/>
             <Route path="/login" component={Login}/>
        </div>
      )
  }

  render() {
    return(
      <div style={mystyle}>
        <Notifications />
        {this.renderMainContent()}
      </div>
    )
  }
}

//estilos
var mystyle={
  'height' : 'inherit'
}

export default App;
