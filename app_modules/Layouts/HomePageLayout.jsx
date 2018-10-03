import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Button, Container, Divider, Grid, Header, Icon, Image, List,
  Menu, Responsive, Segment, Sidebar, Visibility, Card} from 'semantic-ui-react'
import Carousel from 'react-bootstrap/lib/Carousel'

export default class HomePageLayout extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Container>
          <Header
            as='h1'
            content='Ropalinda'
            inverted
            style={{
              fontWeight: 'normal',
              marginBottom: 0
            }}
          />
          
          <Carousel>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="../../assets/slide1.jpg" />
                <Carousel.Caption>
                  <h3>Trend alert</h3>
                  <p>Nueva colección por tiempo limitado.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="../../assets/slide2.jpg" />
                <Carousel.Caption>
                  <h3>Animal print</h3>
                  <p>Estampados en tendencia.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="../../assets/slide3.jpg" />
                <Carousel.Caption>
                  <h3>Auntum looks</h3>
                  <p>La temperatura baja, pero el estilo emerge.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

        
        <div>
      
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
            <Grid.Column width={5}>
              <Card>
                <Image src='../../assets/1.jpg' />
                <Card.Content>
                  <Card.Header>Falda denim</Card.Header>
                  <Card.Meta>
                    <span className='date'>REF. 1330/534-I2018 </span>
                  </Card.Meta>
                  <Card.Description>$ 449.00.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 valoraciones esta semana
                  </a>
                </Card.Content>
              </Card>
              </Grid.Column>

              <Grid.Column width={5}>
              <Card>
                <Image src='../../assets/2.jpg' />
                <Card.Content>
                  <Card.Header>Abrigo leopardo cruzado</Card.Header>
                  <Card.Meta>
                    <span className='date'>REF. 5832/120-I2018</span>
                  </Card.Meta>
                  <Card.Description>$ 899.00</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 valoraciones esta semana
                  </a>
                </Card.Content>
              </Card>
              </Grid.Column>

              <Grid.Column width={5}>
              <Card>
                <Image src='../../assets/3.jpg' />
                <Card.Content>
                  <Card.Header>Cazadora pelo bucle rib</Card.Header>
                  <Card.Meta>
                    <span className='date'>COD. 5758/744-I2018</span>
                  </Card.Meta>
                  <Card.Description>$ 899.00</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 valoraciones esta semana
                  </a>
                </Card.Content>
              </Card>
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
            <Grid.Column width={5}>
              <Card>
                <Image src='../../assets/1.jpg' />
                <Card.Content>
                  <Card.Header>Falda denim</Card.Header>
                  <Card.Meta>
                    <span className='date'>REF. 1330/534-I2018 </span>
                  </Card.Meta>
                  <Card.Description>$ 449.00.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 valoraciones esta semana
                  </a>
                </Card.Content>
              </Card>
              </Grid.Column>

              <Grid.Column width={5}>
              <Card>
                <Image src='../../assets/2.jpg' />
                <Card.Content>
                  <Card.Header>Abrigo leopardo cruzado</Card.Header>
                  <Card.Meta>
                    <span className='date'>REF. 5832/120-I2018</span>
                  </Card.Meta>
                  <Card.Description>$ 899.00</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 valoraciones esta semana
                  </a>
                </Card.Content>
              </Card>
              </Grid.Column>

              <Grid.Column width={5}>
              <Card>
                <Image src='../../assets/3.jpg' />
                <Card.Content>
                  <Card.Header>Cazadora pelo bucle rib</Card.Header>
                  <Card.Meta>
                    <span className='date'>COD. 5758/744-I2018</span>
                  </Card.Meta>
                  <Card.Description>$ 899.00</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 valoraciones esta semana
                  </a>
                </Card.Content>
              </Card>
              </Grid.Column>
            </Grid.Row>
            
          </Grid>
        </Segment>
        </div>

         <Segment inverted vertical style={{ padding: '5em 0em' }}>
      

          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Footer Header
                  </Header>
                  <p>
                    Extra space for a call to action inside the footer
                    that could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      
      </Container>
    )
  }

}
