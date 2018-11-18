import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Modal, Button, Container, Divider, Grid, Header, Icon, Image, List,
  Menu, Responsive, Segment, Sidebar, Visibility, Link, Dropdown} from 'semantic-ui-react'
import Login from '../Access/Login.jsx'

export default class DesktopContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      modalLoginVisible:false,
      activeItem: 'home'
    }
      this.hideFixedMenu = this.hideFixedMenu.bind(this);
      this.showFixedMenu = this.showFixedMenu.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.openModal = this.openModal.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }

  hideFixedMenu(){
    this.setState({ fixed: false })
  }

  showFixedMenu(){
    this.setState({ fixed: true })
  }

  handleClick(e, {name}){
    let ruta = window.location.href.split('#');
    window.location.href = ruta[0] + '#/' + name;

    this.setState({ activeItem: name })
  }

  closeModal(){
    this.setState({modalLoginVisible:false})
  }

  openModal(){
    this.setState({modalLoginVisible:true})
  }

  render(){
    const { children } = this.props
    const { fixed, activeItem } = this.state

    return (
      <Responsive
      minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 80, padding: '1em 0em' }}
            vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}>

              <Container>
              <Image src='../../assets/logo.png' bordered size='small' style={{padding: '10px' }}/>
                <Menu.Item name='home' active={activeItem==='home'} onClick={this.handleClick}>
                  Inicio
                </Menu.Item>
                <Dropdown item simple text='Hombre'>
                  <Dropdown.Menu>
                     <Dropdown.Item as={Link} to='/home'>Camisas</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Jeans</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Corbatas</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Abrigos</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Jeans</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Gorras</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
                <Dropdown item simple text='Mujer'>
                  <Dropdown.Menu>
                     <Dropdown.Item as={Link} to='/home'>Vestidos</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Tops</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Jeans</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Pantalones</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Faldas</Dropdown.Item>
                     <Dropdown.Item as={Link} to='/home'>Camisas</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
               <Menu.Item name='ofertas' active={activeItem==='ofertas'} onClick={this.handleClick}>
                 Ofertas
               </Menu.Item>
                <Menu.Item position='right'>
                  <Modal
                    trigger={
                      <Button inverted={!fixed} onClick={this.openModal}>Iniciar sesión</Button>
                      }
                    onClose={this.closeModal}
                    open={this.state.modalLoginVisible}>
                    <Header content='Iniciar Sesión' textAlign='center'/>
                    <Modal.Content >
                      <Login close={this.closeModal}/>
                    </Modal.Content>
                  </Modal>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
          <br></br>
        </Visibility>
        {children}
      </Responsive>
    )
  }

}
