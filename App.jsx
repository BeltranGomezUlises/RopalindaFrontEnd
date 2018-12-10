import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Notifications, {notify} from 'react-notify-toast';
// app_modules
import HomePageLayout from './app_modules/Layouts/HomePageLayout.jsx';
import HomePageHeading from './app_modules/Layouts/HomePageHeading.jsx';
import ProspectiveRegister from './app_modules/Access/ProspectiveRegister.jsx';
import config from './config.json';
import GarmentDetail from './app_modules/Layouts/GarmentDetail.jsx';
import GarmentCatalog from './app_modules/Catalogs/Garments/GarmentCatalog.jsx';

const App =()=>(
    <HashRouter>
        <MainContainer></MainContainer>
    </HashRouter>
)

class MainContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {menuVisible: true};
    localStorage.setItem('url', config.apiUrl );
  }

  renderMainContent(){
      let ruta = window.location.href.split('#');
      if (ruta[1] == '/') {
          window.location.href = ruta[0] + '#/home';
      }else{
        return(
          <HomePageHeading>
            <Route path="/home" component={HomePageLayout}/>
            <Route path="/prospectiveCustomerRegister" component={ProspectiveRegister}/>
            <Route path={"/detalle-prenda/:id"} component={GarmentDetail}/>
            <Route path="/garmentCatalog/:subCategoryId" component={GarmentCatalog}/>
          </HomePageHeading>
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
