import React, { Component } from 'react'
import {Button, Container, Divider, Grid, Header, Icon, Image, List,
  Menu, Responsive, Segment, Sidebar, Visibility, Card} from 'semantic-ui-react'
import Carousel from 'react-bootstrap/lib/Carousel'
  export default class HomePageHeading extends Component{

    constructor(props){
      super(props);
    }

    render(){
      return(
        <Container text>
          <Header
            as='h1'
            content='Ropalinda'
            inverted
            style={{
              fontWeight: 'normal',
              marginBottom: 0
            }}
          />
          <Header
            as='h2'
            content='Be your own fashion designer'
            inverted
            style={{
              fontWeight: 'normal'
            }}
          />
          <Carousel>
              <Carousel.Item>
                <img width={1234234200} height={500} alt="900x500" src="../../assets/slide1.jpg" />
                <Carousel.Caption>
                  <h3>Trend alert</h3>
                  <p>Nueva colección por tiempo limitado.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={234241200} height={500} alt="900x500" src="../../assets/slide2.jpg" />
                <Carousel.Caption>
                  <h3>Animal print</h3>
                  <p>Estampados en tendencia.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={1223423400} height={500} alt="900x500" src="../../assets/slide3.jpg" />
                <Carousel.Caption>
                  <h3>Auntum looks</h3>
                  <p>La temperatura baja, pero el estilo emerge.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

        </Container>
      )
    }

  }