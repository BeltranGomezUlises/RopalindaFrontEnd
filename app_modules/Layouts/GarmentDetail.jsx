import React, { Component } from 'react';
import {
    Card,
    Image,
    List,
    Icon
} from 'semantic-ui-react';
import {
    DetailContainer,
    GarmentContainer,
    CompatibleGarmentContainer,
    GarmentName,
    GarmentPrice
} from '../../styledcomponents/GarmentDetail.js';
export default class GarmentDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            garment: {},
            activeImage: ''
        }
    }

    componentDidMount() {
        let id = this.props.id;
        fetch('http://74.208.178.83:8080/Ropalinda/api/garments/' + id,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => res.json())
            .then((r) => {
                utils.evalResponse(r, () => {
                    this.setState({ garment: r.data })
                })
            });
    }

    renderCompatibleGarments() {
        this.state.garment.imagesList.map(i => {
            return (
                <Card size=''>
                    <Image
                        fluid
                        size='tiny'
                        label={{ as: 'a', corner: 'left', icon: 'check circle' }}
                        src={localStorage.getItem('url')+'utilities/getFile/'+i.imagesPK.imagePath}
                    />
                </Card>
            )
        })
    }

    render() {
        return (
            <DetailContainer>
                <GarmentContainer>
                    <Card>
                        <Image src={this.state.activeImage} />
                    </Card>
                    <List>
                        <List.Item>
                            <GarmentName>{this.state.garment.name}</GarmentName>
                        </List.Item>
                        <List.Item>
                            <Icon name='dollar' />
                            <GarmentPrice>{this.state.garment.price}</GarmentPrice>
                        </List.Item>
                        <Input
                            label='Cantidad:'
                            type='number' />
                        <Button animated='vertical'>
                            <Button.Content hidden>Agregar al carrito</Button.Content>
                            <Button.Content visible>
                                <Icon name='shop' />
                            </Button.Content>
                        </Button>
                        <Button animated='vertical'>
                            <Button.Content hidden>Guardar prenda</Button.Content>
                            <Button.Content visible>
                                <Icon name='save' />
                            </Button.Content>
                        </Button>
                    </List>
                </GarmentContainer>
                <CompatibleGarmentContainer>
                    <Card.Group>
                        {this.renderCompatibleGarments}
                    </Card.Group>
                </CompatibleGarmentContainer>
            </DetailContainer>
        )
    }
}