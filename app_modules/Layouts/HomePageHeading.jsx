import React, { Component } from 'react';
import { Modal, Header, Image, Menu, Link, Dropdown, Icon, Popup, Label } from 'semantic-ui-react'
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
import MySearch from './MySearch.jsx';
import * as utils from '../../utils.js'
import Carrito from '../Carrito/Carrito.jsx'

export default class HomePageHeading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalLoginVisible: false,
      categories: [],
      modalCarrito: false
    }
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModalCarrito = this.closeModalCarrito.bind(this);
    this.openModalCarrito = this.openModalCarrito.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    fetch(localStorage.getItem('url') + 'categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': ''
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
  }

  closeModal() {
    this.setState({ modalLoginVisible: false })
  }

  openModal() {
    this.setState({ modalLoginVisible: true })
  }

  openModalCarrito() {
    this.setState({ modalCarrito: true });
  }

  closeModalCarrito() {
    this.setState({ modalCarrito: false });
  }

  renderCategoryList() {
    return this.state.categories.map(i => {
      return (
        <Dropdown key={i.id}
          style={{ marginRight: '24px' }}
          name={'prendas/' + i.name}
          item simple
          text={i.name}
          icon={
            <img src={localStorage.getItem('url') + 'utilities/getFile/' + i.icon}
              heigth='24px' width='24px' style={{ padding: 5 }}
            />
          }>
          <Dropdown.Menu>
            {this.renderSubCategoryList(i.subcategoryCollection)}
          </Dropdown.Menu>
        </Dropdown>
      )
    })
  }

  renderSubCategoryList(subCategories) {
    return subCategories.filter(sub => sub.active).map(sub => {
      return (
        <Dropdown.Item key={sub.id} name={'garmentCatalog/' + sub.id}
          as={Link} onClick={this.handleClick}>
          <img src={localStorage.getItem('url') + 'utilities/getFile/' + sub.icon} />
          {sub.name}
        </Dropdown.Item>
      )
    }
    )
  }

  renderCarrito() {
    let user = localStorage.getItem('logedUser');
    let carrito;
     if(localStorage.getItem('carrito') != null){
      carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    if (user) {
      return (
        <Menu.Item as='a' style={{ padding: 5 }}>
          <Popup trigger={
            <div>
              <Icon
                name='shopping cart'
                size='large'
                style={{ position: 'relative', cursor: 'pointer', margin: 0 }}
                onClick={this.openModalCarrito}
              />
              {carrito != null && carrito.lineas != null ? 
              <Label size='tiny' color='red' floating style={{ top: -5 }}>
                {carrito.lineas.length}
              </Label> : null}

            </div>
          } content='Carrito' />
        </Menu.Item>

      )
    }
  }

  renderMyPersonalizedGarments() {
    let user = localStorage.getItem('logedUser');
    if (user) {
      return (
        <Menu.Item as='a' style={{ padding: 5 }}>
          <Popup trigger={
            <Icon
              name='tags'
              style={{ cursor: 'pointer', margin: 0 }}
              size='large'
              onClick={() => {
                let ruta = window.location.href.split('#');
                window.location.href = ruta[0] + '#/personalized-garments';
              }}
            />
          }
            content='Mis prendas personalizadas'
          />
        </Menu.Item>
      )
    }
  }

  renderLogin() {
    let user = localStorage.getItem('logedUser');
    if (user !== null) {
      return (
        <Menu.Item as='a' style={{ padding: 5 }}>
          <Popup trigger={
            <Icon
              name='log out'
              size='large'
              style={{ cursor: 'pointer', margin: 0 }}
              onClick={() => {
                localStorage.removeItem('logedUser');
                localStorage.removeItem('tokenSesion');
                localStorage.removeItem('carrito');
                location.reload();
              }}
            />} content='Salir' />
        </Menu.Item>

      )
    } else {
      return (
        <Menu.Item as='a' style={{ padding: 5 }}>
          <Popup trigger={
            <Icon
              name='user outline'
              size='large'
              style={{ cursor: 'pointer' }}
              onClick={this.openModal}
            />} content='Iniciar sesión' />
        </Menu.Item>


      )
    }
  }

  render() {
    const { children } = this.props

    return (
      <MainContainer>
        <HeadingContainer>
          <LogoSection>
            <div onClick={() => {
              let ruta = window.location.href.split('#');
              window.location.href = ruta[0] + '#/' + 'home';
            }}>
              <Image src='assets/logo.png' size='small' style={{ height: '42px', objectFit: 'contain', cursor: 'pointer' }} />
            </div>
            <Menu compact borderless style={{ position: 'absolute', right: 5 }}>

              {this.renderMyPersonalizedGarments()}

              {this.renderCarrito()}
              {this.renderLogin()}
            </Menu>

            <MySearch style={{ position: 'absolute', right: '200px' }} />
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

          <Modal
            onClose={this.closeModalCarrito}
            open={this.state.modalCarrito}
            onOpen={this.openModalCarrito}
          >
            <Header content='Carrito de compras' textAlign='center' />
            <Modal.Content >
              <Carrito close={this.closeModalCarrito} />
            </Modal.Content>
          </Modal>
        </HeadingContainer>
        <div style={{ marginTop: 111 }}>
          {children}
        </div>
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
