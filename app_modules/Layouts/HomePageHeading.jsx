import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Button, Container, Divider, Grid, Header, Icon, Image, List,
  Menu, Responsive, Segment, Sidebar, Visibility} from 'semantic-ui-react'

export default class HomePageHeading extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Container text>
        <Header
          as='h1'
          content='Imagine-a-Company'
          inverted
          style={{
            fontWeight: 'normal',
            marginBottom: 0
          }}
        />
        <Header
          as='h2'
          content='Do whatever you want when you want to.'
          inverted
          style={{
            fontWeight: 'normal'
          }}
        />
        <Button primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    )
  }

}
