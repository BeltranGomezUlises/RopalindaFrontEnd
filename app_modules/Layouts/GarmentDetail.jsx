import React, { Component } from 'react';
import {
    Card,
    Image,
    List,
    Icon,
    Input,
    Button,
    Segment
} from 'semantic-ui-react';
import {
    DetailContainer,
    GarmentContainer,
    CompatibleGarmentContainer,
    GarmentName,
    GarmentPrice
} from '../../styledcomponents/GarmentDetail.js';
import * as utils from '../../utils.js';
export default class GarmentDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            garment: {},
            activeImage: ''
        }
    }

    componentWillMount() {
        let { id } = this.props.match.params;
        fetch(localStorage.getItem('url') + 'garments/' + id,
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
                    this.setState(
                        {
                            garment: r.data,
                            activeImage: r.data.imagesList[0] ? localStorage.getItem('url') + 'utilities/getFile/' + r.data.imagesList[0].imagesPK.imagePath : ''
                        })
                })
            });
    }

    renderCompatibleGarments() {
        return this.state.garment.compatibleGarmentList.map(i => {
            return (
                <Card>
                    <Image
                        size='tiny'
                        label={{ as: 'a', corner: 'right', icon: 'check circle' }}
                        src={localStorage.getItem('url') + 'utilities/getFile/' + i.image}
                    />
                </Card>
            )
        })
    }
    renderGarmentImages() {
        return this.state.garment.imagesList.map(i => {
            return (
                <Image
                    size='small'
                    src={localStorage.getItem('url') + 'utilities/getFile/' + i.imagesPK.imagePath}
                    centered
                    bordered
                    onClick={() => {
                        this.setState({
                            activeImage: localStorage.getItem('url') + 'utilities/getFile/' + i.imagesPK.imagePath
                        })
                    }}
                />
            )
        })
    }

    render() {
        console.log(this.state)
        return (

            <div>
                <div>
                    <Segment.Group horizontal>
                    <div style={{maxWidth: 70}}>
                        {this.state.garment.imagesList ? this.renderGarmentImages() : <div />}
                    </div>
                    
                    <Card image={this.state.activeImage} />
                    <Segment.Group>
                        <Segment>
                            <h2>{this.state.garment.name}</h2>
                            <Icon name='dollar' />
                            {this.state.garment.price}
                        </Segment>
                        <Input
                            defaultValue='1'
                            label='Cantidad:'
                            type='number' />
                        <Segment>
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
                        </Segment>

                    </Segment.Group>

                </Segment.Group>
                </div>
                
                    <Card.Group>
                        {this.state.garment.compatibleGarmentList ? this.renderCompatibleGarments() : <div />}
                    </Card.Group>
            </div>
            
        )
    }
}