import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Button, Container, Divider, Grid, Header, Icon, Image, List,
  Menu, Responsive, Segment, Sidebar, Visibility, Link} from 'semantic-ui-react'
import HomePageHeading from './HomePageHeading.jsx';

export default class DesktopContainer extends Component{

  constructor(props){
    super(props);
    this.state = {

    }

      this.hideFixedMenu = this.hideFixedMenu.bind(this);
      this.showFixedMenu = this.showFixedMenu.bind(this);
  }

  hideFixedMenu(){
    this.setState({ fixed: false })
  }

  showFixedMenu(){
    this.setState({ fixed: true })
  }


  render(){
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                  <Button inverted={!fixed} onClick={()=>{
                      let ruta = window.location.href.split('#');
                       window.location.href = ruta[0] + '#/login';
                  }}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomePageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }

}
