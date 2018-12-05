import React, { Component } from 'react'
import {
  Modal, Button, Container, Header, Image,
  Menu, Icon, Link, Dropdown
} from 'semantic-ui-react'
import Login from '../Access/Login.jsx'
import * as utils from '../../utils.js'

const rutaCategorias = 'http://74.208.178.83:8080/Ropalinda/api/categories';
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIn0.kJdFAfN1eP6-4vEjv0lTRVsmj4L3RAJ60nl3vJFAfoLAK5tSkf-Qh-B8lyerGnA9oFnQIlVrEXj9xrYV6RKzLQ';
const iconRoute = localStorage.getItem('url') + 'utilities/getFile/'
export default class DesktopContainer extends Component {

  constructor(props) {
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
    fetch(rutaCategorias, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': token //localStorage.getItem('tokenSesion')
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
          key={i.id} 
          name={i.name} 
          item 
          simple 
          text={i.name} 
          icon={
              <img src={this.iconRoute + i.icon}
              width='24px'/>}>
          <Dropdown.Menu>
            {this.renderSubCategoryList(i.subcategoryCollection)}
          </Dropdown.Menu>
        </Dropdown>
      )
    })
  }

  renderSubCategoryList(subCategories) {
    return subCategories.map(sub => {
      return (
        <Dropdown.Item key={sub.id} name={sub.name} as={Link} onClick={this.handleClick}>
        <img src={this.iconRoute + sub.icon}/>
        {sub.name}
        </Dropdown.Item>
      )
    }
    )
  }

  render() {
    const { children } = this.props
    const { fixed, activeItem } = this.state

    return (
      <div>
        <Menu
          fixed={top}
          style={{ "max-height": "70px", "min-height": "70px" }}>
          <Container>
            <Image src='assets/logo.png' bordered size='small' style={{ padding: '10px' }} />
              <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleClick}>
                <Icon name='home'/>
                Inicio
                </Menu.Item>
              {this.renderCategoryList()}
                <Menu.Item position='right'>
                  <Modal
                    trigger={
                      <Button onClick={this.openModal}>Iniciar sesión</Button>
                    }
                    onClose={this.closeModal}
                    open={this.state.modalLoginVisible}>
                    <Header content='Iniciar Sesión' textAlign='center' />
                    <Modal.Content >
                      <Login close={this.closeModal} />
                    </Modal.Content>
                  </Modal>
                </Menu.Item>
          </Container>
        </Menu>
        <div style={{ "max-height": "70px", "min-height": "70px" }}></div>
        {children}
      </div>
    )
  }

}
