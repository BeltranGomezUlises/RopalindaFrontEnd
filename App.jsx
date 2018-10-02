import React from 'react';
import { Route, Link, HashRouter } from 'react-router-dom';
import { Button, Container, Divider,  Dropdown,  Header,  Message,
  Segment,  Menu, Icon, Sidebar, Image } from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
// app_modules
import HomePageLayout from './app_modules/Layouts/HomePageLayout.jsx';
import DesktopContainer from './app_modules/Layouts/DesktopContainer.jsx';
import ProspectiveRegister from './app_modules/Access/ProspectiveRegister.jsx';
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
      let ruta = window.location.href.split('#');
      if (ruta[1] == '/') {
          window.location.href = ruta[0] + '#/home';
      }else{
        return(
          <DesktopContainer>
               <Route path="/home" component={HomePageLayout}/>
               <Route path="/prospectiveCustomerRegister" component={ProspectiveRegister}/>
          </DesktopContainer>
        )
      }
  }

  render() {
    return(
      <div>
        <Notifications />
        {this.renderMainContent()}
      </div>
    )
  }
}

export default App;
