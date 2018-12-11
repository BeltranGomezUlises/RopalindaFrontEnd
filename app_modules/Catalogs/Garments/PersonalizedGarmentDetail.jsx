import React, { Component } from 'react';
import {
    Card,
    Image,
    Icon,
    Input,
    Button,
    Segment,
    Loader
} from 'semantic-ui-react';
import * as utils from '../../../utils.js';
import numeral from 'numeral';
export default class PersonalizedGarmentDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            garment: {},
            activeImage: '',
            quantity: 1
        }
        this.setQuantity = this.setQuantity.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let { id } = this.props.match.params;
        let nextId = nextProps.match.params.id;
        if (id != nextId) {
            this.loadData(nextId);
        }
    }

    componentWillMount() {
        let { id } = this.props.match.params;
        this.loadData(id);
    }

    loadData(id) {
        fetch(localStorage.getItem('url') + 'personalizedGarments/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('tokenSesion')
            }
        }).then((res) => res.json())
            .then((r) => {
                utils.evalResponse(r, () => {
                    this.setState(
                        {
                            loading: false,
                            garment: r.data,
                            activeImage: localStorage.getItem('url') + 'utilities/getFile/' + r.data.garment.previewImage
                        })
                })
            });
    }

    renderCompatibleGarments() {
        let { garment } = this.state;
        return garment.personalizedGarmentCompatibleList.map(i => {
            return (
                <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={i.id}>
                    <div style={{ height: '120px', overflow: 'hidden' }}>
                        <Image
                            className="image-card"
                            label={{ corner: 'right', icon: 'check circle', color: 'green' }}
                            style={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'all 0.25s' }}
                            src={localStorage.getItem('url') + 'utilities/getFile/' + i.compatibleGarment.previewImage} />
                    </div>
                    <Card.Content>
                        <Card.Header>{i.compatibleGarment.name}</Card.Header>
                        <Card.Description>
                            {i.compatibleGarment.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='dollar' />
                        {numeral(i.compatibleGarment.price).format('0,0.00')}
                    </Card.Content>
                </Card>
            )
        })
    }

    setQuantity(evt) {
        let { value } = evt.target;
        if (value < 100) {
            this.setState({
                quantity: value
            })
        }
    }

    renderPreviewImage() {
        this.setState({
            activeImage: localStorage.getItem('url') + 'utilities/getFile/' + this.state.garment.previewImage
        })
    }

    renderPersonalizeSection() {
        if (this.state.garment &&
            this.state.garment.personalizedGarmentCompatibleList &&
            this.state.garment.personalizedGarmentCompatibleList.length > 0) {
            return (
                <div>
                    <h2 style={{ textAlign: 'center' }}>Prendas compatibles</h2>
                    <Card.Group itemsPerRow='8' style={{ justifyContent: 'center' }}>
                        {this.state.garment.personalizedGarmentCompatibleList ? this.renderCompatibleGarments() : <div />}
                    </Card.Group>
                </div>
            )
        } else
            return <div />
    }

    render() {
        if (this.state.loading) {
            return (
                <Segment style={{ 'min-height': '400px' }}>
                    <Loader active size='big'>Cargando...</Loader>
                </Segment>
            )
        } else {
            return (
                <div style={{ paddingTop: '10px' }}>
                    <h2 style={{ textAlign: 'center' }}>Detalle de prenda personalizada</h2>
                    <Segment.Group horizontal style={{ justifyContent: 'center' }}>
                        <Card image={this.state.activeImage} />
                        <Segment.Group>
                            <Segment>
                                <h2>{this.state.garment.garment.name}</h2>
                                <h4>{this.state.garment.garment.description}</h4>
                                <Icon name='dollar' />
                                {this.state.garment.garment.price}
                            </Segment>
                            <Input
                                label='Cantidad:'
                                min='1'
                                onChange={this.setQuantity}
                                value={this.state.quantity}
                                type='number' />
                            <div style={{ margin: '10px', display: 'flex', bottom: 0, position: 'absolute' }}>
                                <Button label='Agregar al carrito' icon='shop' />
                            </div>
                        </Segment.Group>

                    </Segment.Group>
                    {this.renderPersonalizeSection()}
                </div>

            )
        }

    }
}