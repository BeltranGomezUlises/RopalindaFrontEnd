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
} from '../../styledcomponents/home';
import Login from '../Access/Login.jsx'
import * as utils from '../../utils.js'

const rutaCategorias = 'http://74.208.178.83:8080/Ropalinda/api/categories';
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIn0.kJdFAfN1eP6-4vEjv0lTRVsmj4L3RAJ60nl3vJFAfoLAK5tSkf-Qh-B8lyerGnA9oFnQIlVrEXj9xrYV6RKzLQ';;

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
        <Dropdown style={{ marginRight: '24px' }} key={i.id} name={i.name} item simple text={i.name}>
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
        <Dropdown.Item key={sub.id} name={sub.name} as={Link} onClick={this.handleClick}>{sub.name}</Dropdown.Item>
      )
    }
    )
  }

  render(){
    const { fixed, activeItem } = this.state;
    const { children } = this.props

    return(
      <MainContainer>
        <HeadingContainer>
          <LogoSection>
            <Image src='assets/logo.png' size='small' style={{ height: '42px', objectFit: 'contain', cursor: 'pointer' }} />
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
              <Menu.Item name='ofertas' active={activeItem === 'ofertas'} onClick={this.handleClick}>
                Ofertas
              </Menu.Item>
            </Menu>
          </OptionsSection>
          <Modal
            onClose={this.closeModal}
            open={this.state.modalLoginVisible}>
            <Header content='Iniciar Sesión' textAlign='center' />
            <Modal.Content >
              <Login close={this.closeModal} />
            </Modal.Content>
          </Modal>
        </HeadingContainer>
        {children}
      </MainContainer>
    );
  }
}
