import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Modal, Button, Container, Divider, Grid, Header, Icon, Image, List,
  Menu, Responsive, Segment, Sidebar, Visibility, Link, Dropdown} from 'semantic-ui-react'
import Login from '../Access/Login.jsx'

export default class DesktopContainer extends Component{

  constructor(props){
    super(props);
    this.state = {
      modalLoginVisible:false
    }
      this.hideFixedMenu = this.hideFixedMenu.bind(this);
      this.showFixedMenu = this.showFixedMenu.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.openModal = this.openModal.bind(this);
  }

  hideFixedMenu(){
    this.setState({ fixed: false })
  }

  showFixedMenu(){
    this.setState({ fixed: true })
  }

  closeModal(){
    this.setState({modalLoginVisible:false})
  }

  openModal(){
    this.setState({modalLoginVisible:true})
  }

  render(){
    const { children } = this.props
    const { fixed } = this.state

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
              secondary={!fixed}
              size='large'>
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item>
                  <Dropdown text='Hombres'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Prendas</Dropdown.Header>
                      <Dropdown.Item>Camisas</Dropdown.Item>
                      <Dropdown.Item>Jeans</Dropdown.Item>
                      <Dropdown.Item>Corbatas</Dropdown.Item>
                      <Dropdown.Item>Abrigos</Dropdown.Item>
                      <Dropdown.Item>Sudaderas</Dropdown.Item>
                      <Dropdown.Item>Gorras</Dropdown.Item>
                      <Dropdown.Item>Cinturones</Dropdown.Item>
                      <Dropdown.Item>Bermudas</Dropdown.Item>
                      <Dropdown.Item>Playeras</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item>
                  <Dropdown text='Mujeres'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Prendas</Dropdown.Header>
                      <Dropdown.Item>Vestidos</Dropdown.Item>
                      <Dropdown.Item>Tops</Dropdown.Item>
                      <Dropdown.Item>Jeans</Dropdown.Item>
                      <Dropdown.Item>Pantalones</Dropdown.Item>
                      <Dropdown.Item>Faldas</Dropdown.Item>
                      <Dropdown.Item>Camisas</Dropdown.Item>
                      <Dropdown.Item>Sudaderas</Dropdown.Item>
                      <Dropdown.Item>Blazers</Dropdown.Item>
                      <Dropdown.Item>Shorts</Dropdown.Item>
                      <Dropdown.Item>Joyeria</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item as='a'>Ofertas</Menu.Item>
                <Menu.Item>
                  
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
