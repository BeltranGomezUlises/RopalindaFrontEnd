import React, { Component } from 'react'
import {Button, Container, Divider, Grid, Header, Image, List, Segment} from 'semantic-ui-react'

export default class HomePageLayout extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Segment vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Mejores modas del 2018
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Para nuestros clientes tenemos las mejores modas.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Diseños propios
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Tenemos nuestros propios diseñadores a cargo de marcar las tendencias
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image bordered rounded  circular size='large'
                src='assets/slider.gif' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Button size='huge'>Revisar nuevas tendencias</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  La meyor empresa de moda
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                10 años de diseño y produccion nos respaldan
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  "Las personalidades famosas prefieren ropalinda"
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Equipo de diseño de Ropalinda 2014
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Promociones para nuestros mejores clientes
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Si eres cliente de ropalinda puedes ser acreedor de un descuento en tu primera compra
            </p>
            <Button as='a' size='large'>
              Ver
            </Button>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              Más
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Novedades
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Todo el año contamos con nuevas prendas, visitalas
            </p>
            <Button as='a' size='large'>
              Ver
            </Button>
          </Container>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Acerca de' />
                  <List link inverted>
                    <List.Item as='a'>Contactanos</List.Item>
                    <List.Item as='a'>Eventos</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Servicios' />
                  <List link inverted>
                    <List.Item as='a'>Pre-order</List.Item>
                    <List.Item as='a'>Ventas</List.Item>
                    <List.Item as='a'>Distribución</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Tarea Ingenieria web
                  </Header>
                  <p>
                   Ulises Beltrán
                  </p>
                  <p>
                   Ricardo Morales
                  </p>
                  <p>
                   Edith Castro
                  </p>
                  <p>
                   Carolina Martinez
                  </p>
                  <p>
                   Antonio Valle
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }

}
