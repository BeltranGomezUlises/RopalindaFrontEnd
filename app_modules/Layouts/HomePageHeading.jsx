import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import {
  Modal, Button, Container, Header, Image,
  Menu, Responsive, Segment, Visibility, Link, Dropdown
} from 'semantic-ui-react'
import {
  HeadingContainer,
  LogoSection,
  OptionsSection,
  MainContainer,
  FooterPreInfo,
  FooterLinksSection,
  Footer,
  LinkSection,
  LinkFooter,
  LinkF,
  LocationInfo,
} from '../../styledcomponents/home';
import Login from '../Access/Login.jsx'
import * as utils from '../../utils.js'


export default class HomePageHeading extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalLoginVisible: false,
      activeItem: 'home',
      categories: []
    }
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetch(localStorage.getItem('url') + 'categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization':''
      }
    }).then((res) => res.json())
      .then((r) => {
        utils.evalResponse(r, () => {
          this.setState({ categories: r.data })
        })
      });
  }

  hideFixedMenu() {
    this.setState({ fixed: false })
  }

  showFixedMenu() {
    this.setState({ fixed: true })
  }

  handleClick(e, { name }) {
    let ruta = window.location.href.split('#');
    window.location.href = ruta[0] + '#/' + name;

    this.setState({ activeItem: name })
  }

  closeModal() {
    this.setState({ modalLoginVisible: false })
  }

  openModal() {
    this.setState({ modalLoginVisible: true })
  }

  renderCategoryList() {
    return this.state.categories.map(i => {
      return (
        <Dropdown 
          style={{ marginRight: '24px' }} 
          key={i.id} 
          name={'prendas/'+i.name} 
          item 
          simple 
          text={i.name}
          icon={
            <img src={ localStorage.getItem('url') + 'utilities/getFile/' + i.icon}/>
            }>
          <Dropdown.Menu>
            {this.renderSubCategoryList(i.subcategoryCollection,i.name)}
          </Dropdown.Menu>
        </Dropdown>
      )
    })
  }

  renderSubCategoryList(subCategories, categoryName) {
    return subCategories.map(sub => {
      return (
        <Dropdown.Item key={sub.id} name={'prendas/'+categoryName+'/'+sub.name} as={Link} onClick={this.handleClick}>
          <img src={localStorage.getItem('url') + 'utilities/getFile/' + sub.icon}/>
          {sub.name}
        </Dropdown.Item>
      )
    }
    )
  }

  render(){    
    const { children } = this.props

    return(
      <MainContainer>
        <HeadingContainer>
          <LogoSection>
            <div onClick={() => {
              let ruta = window.location.href.split('#');
              window.location.href = ruta[0] + '#/' + 'home';
              this.setState({ activeItem: 'home' })
            }}>
              <Image src='assets/logo.png' size='small' style={{ height: '42px', objectFit: 'contain', cursor: 'pointer' }} />
            </div>
            
            <Icon
              name='user outline'
              size='large'
              style={{ position: 'absolute', right: '32px', cursor: 'pointer', color: '#2224267a' }}
              onClick={this.openModal}
            />
            <Input style={{ border: 'none', borderBottom: '1px solid rgba(34,36,38,.15)', borderRadius: 'none', position: 'absolute', right: '80px' }}
              icon
              placeholder='Buscar...'
            >
              <input style={{ border: 'none' }} />
              <Icon name='search' />
            </Input>
          </LogoSection>
          <OptionsSection>
            <Menu style={{ border: 'none' }}>
              {this.renderCategoryList()}
            </Menu>
          </OptionsSection>
          <Modal
            onClose={this.closeModal}
            open={this.state.modalLoginVisible}
            size="tiny"
            closeIcon
          >
            <Header content='Iniciar Sesión' textAlign='center' />
            <Modal.Content >
              <Login close={this.closeModal} />
            </Modal.Content>
          </Modal>
        </HeadingContainer>

        {children}

        <FooterPreInfo>
          <LocationInfo
            href="https://www.google.com/maps/place/Forum+Culiac%C3%A1n/@24.8142844,-107.4028839,17z/data=!3m1!4b1!4m5!3m4!1s0x86bcd0a76213076f:0xa0f9556f4de4be4!8m2!3d24.8142795!4d-107.4006952"
            target="_blank"
          >
            <Image src='assets/marker.svg' size='small' style={{ width: '16px', marginRight: '16px' }} />
            <b>¡Ubica tu tienda!</b>
          </LocationInfo>
        </FooterPreInfo>
        <FooterLinksSection>
          <LinkSection>
            <LinkFooter><LinkF>Contacto</LinkF></LinkFooter>
            <LinkFooter><LinkF>Tiendas</LinkF></LinkFooter>
            <LinkFooter><LinkF>Trabaja con nosotros</LinkF></LinkFooter>
            <LinkFooter><LinkF>Ticket electrónico</LinkF></LinkFooter>
            <LinkFooter><LinkF>Online specialist</LinkF></LinkFooter>
            <LinkFooter><LinkF>Affinity Card</LinkF></LinkFooter>
          </LinkSection>
          <LinkSection>
            <LinkFooter><LinkF>Empresa</LinkF></LinkFooter>
            <LinkFooter><LinkF>Newsletter</LinkF></LinkFooter>
            <LinkFooter><LinkF>Press room</LinkF></LinkFooter>
            <LinkFooter><LinkF>Aviso legal</LinkF></LinkFooter>
            <LinkFooter><LinkF>Cookies</LinkF></LinkFooter>
          </LinkSection>
          <LinkSection>
            <LinkFooter><b style={{ color: 'black' }}>Descarga la app</b></LinkFooter>
            <LinkFooter><LinkF>Paga con tu móvil</LinkF></LinkFooter>
            <LinkFooter><LinkF>Guarda tus tickets en la app</LinkF></LinkFooter>
            <LinkFooter><LinkF>Ven a la tienda con tu wishlist</LinkF></LinkFooter>
            <LinkFooter><LinkF>Escanea la ropa para saber más</LinkF></LinkFooter>
            <div>
              <Image src='assets/google-play.png' size='small' style={{ cursor: 'pointer' }} />
            </div>
          </LinkSection>
        </FooterLinksSection>
        <Footer>
          <Image src='assets/logo.png' size='small' style={{ height: '42px', objectFit: 'contain', cursor: 'pointer', marginBottom: '24px' }} />
          <div>© 2018</div>
        </Footer>
      </MainContainer>
    );
  }
}
