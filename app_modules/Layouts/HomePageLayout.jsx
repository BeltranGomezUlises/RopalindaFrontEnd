import React, { Component } from 'react';
import {
  Card,
  Image,
  Icon,
} from 'semantic-ui-react';
import { Carousel } from 'react-bootstrap';
import {
  MainImageContainer,
  MainImage,
  CardsContainer,
  ImageContainer,
  TitleH1,
  Description,
} from '../../styledcomponents/home';
import * as utils from '../../utils.js';
import numeral from 'numeral';

export default class HomePageLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      garments: [],
    }
  }

  componentWillMount() {
    fetch(localStorage.getItem('url') + 'garments'
      + '?select=id,name,description,previewImage,price,subcategory.name,active=true'
      + '&from=0'
      + '&to=8'
      + '&orderBy=id|desc', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then((res) => res.json())
      .then((r) => {
        utils.evalResponse(r, () => {
          this.setState({ garments: r.data })
        })
      });
  }

  render() {
    const {
      garments,
    } = this.state;

    return (
      <div>
        <MainImageContainer>
          <Carousel>
            <Carousel.Item>
              <MainImage src="../../assets/Slider1.png" />
            </Carousel.Item>
            <Carousel.Item>
              <MainImage src="../../assets/Slider2.png" />
            </Carousel.Item>
            <Carousel.Item>
              <MainImage src="../../assets/Slider3.png" />
            </Carousel.Item>
          </Carousel>
        </MainImageContainer>
        <TitleH1>New arrivals</TitleH1>
        <Description>
          ¡Disfruta de los nuevos productos que tenemos para ti!. Personaliza tu prenda y luce un estilo único.
        </Description>
        <CardsContainer>
          {
            garments.map((garment) => (
              <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={garment.id}>
                <ImageContainer>
                  <Image
                    className="image-card"
                    style={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'all 0.25s' }}
                    src={localStorage.getItem('url') + 'utilities/getFile/' + garment.previewImage} />
                </ImageContainer>
                <Card.Content>
                  <Card.Header>{garment.name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{garment.subcategory_name}</span>
                  </Card.Meta>
                  <Card.Description>
                    {garment.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='dollar' />
                    {numeral(garment.price).format('0,0.00')}
                  </a>
                </Card.Content>
              </Card>
            ))
          }
        </CardsContainer>
      </div>
    )
  }

}
