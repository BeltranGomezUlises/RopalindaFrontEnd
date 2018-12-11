import React, { Component } from 'react';
import {
    Card,
    Image,
    Icon,
    Input,
    Button,
    Segment,
    Loader,
    Header
} from 'semantic-ui-react';
import * as utils from '../../../utils.js';
import numeral from 'numeral';
export default class GarmentDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            garment: {},
            activeImage: '',
            canSave: false,
            quantity: 1,
            total: 0
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
        fetch(localStorage.getItem('url') + 'garments/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then((res) => res.json())
            .then((r) => {
                utils.evalResponse(r, () => {
                    r.data.imagesList.push(
                        {
                            imagesPK: {
                                imagePath: r.data.previewImage
                            },
                            active: true
                        });
                    this.setState(
                        {
                            loading: false,
                            garment: r.data,
                            activeImage: localStorage.getItem('url') + 'utilities/getFile/' + r.data.previewImage,
                            total: r.data.price
                        })
                })
            });
    }



    renderPreviewImage() {
        this.setState({
            activeImage: localStorage.getItem('url') + 'utilities/getFile/' + this.state.garment.previewImage
        })
    }

    checkSaveButton() {
        let lista = this.state.garment.compatibleGarmentList;
        let save = lista.filter(i => i.selected)
        this.setState({
            canSave: save.length > 0
        })

    }

    setQuantity(evt) {
        let { value } = evt.target;
        if (value <= 999) {
            let { garment } = this.state;
            let subTotal = garment.price;
            garment.compatibleGarmentList.filter(c => c.selected).forEach(c => { subTotal += c.price });
            subTotal = this.calculateTotal(value, subTotal);
            this.setState({
                quantity: value,
                total: subTotal
            })
        }

    }

    calculateTotal(quantity, subTotal) {
        if (quantity == '') quantity = 1
        return Math.floor(Math.abs(quantity)) * subTotal
    }

    renderPersonalizeSection() {
        if (this.state.garment &&
            this.state.garment.compatibleGarmentList &&
            this.state.garment.compatibleGarmentList.length > 0) {
            return (
                <div>
                    <h2 style={{ textAlign: 'center' }}>Personaliza tu prenda</h2>

                    <Card.Group itemsPerRow='8' style={{ justifyContent: 'center' }}>
                        {this.state.garment.compatibleGarmentList ? this.renderCompatibleGarments() : <div />}
                    </Card.Group>
                </div>
            )
        } else
            return <div />
    }

    renderCompatibleGarments() {
        let { garment } = this.state;
        return garment.compatibleGarmentList.map(i => {
            return (
                <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={i.id} onClick={() => {
                    i.selected = !i.selected;
                    let { quantity } = this.state;
                    let subTotal = garment.price;
                    garment.compatibleGarmentList.filter(c => c.selected).forEach(c => { subTotal += c.price });
                    subTotal = this.calculateTotal(quantity, subTotal);
                    this.setState({ garment: garment, total: subTotal });
                    this.checkSaveButton();

                }}>
                    <div style={{ height: '120px', overflow: 'hidden' }}>
                        <Image
                            className="image-card"
                            label={i.selected ? { corner: 'right', icon: 'check circle', color: 'green' } : null}
                            style={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'all 0.25s' }}
                            src={localStorage.getItem('url') + 'utilities/getFile/' + i.image} />
                    </div>
                    <Card.Content>
                        <Card.Header>{i.name}</Card.Header>
                        <Card.Description>
                            {i.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='dollar' />
                        {numeral(i.price).format('0,0.00')}
                    </Card.Content>
                </Card>
            )
        })
    }

    renderGarmentImages() {
        return this.state.garment.imagesList.map(i => {
            return (
                <Image
                    key={i.imagesPK.imagePath}
                    size='small'
                    style={{ margin: 5 }}
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
        if (this.state.loading) {
            return (
                <Segment style={{minHeight: 400}}>
                    <Loader active size='big'>Cargando...</Loader>
                </Segment>
            )
        } else {
            return (
                <div style={{ paddingTop: '10px' }}>
                    <h2 style={{ textAlign: 'center' }}>Detalle de prenda</h2>
                    <Segment.Group horizontal style={{ justifyContent: 'center' }}>
                        <div style={{ maxWidth: 70, marginRight: '5px' }}>
                            {this.state.garment.imagesList ? this.renderGarmentImages() : <div />}
                        </div>

                        <Card image={this.state.activeImage} />
                        <Segment.Group>
                            <Segment>
                                <h2>{this.state.garment.name}</h2>
                                <h4>{this.state.garment.description}</h4>
                                <h3>Precio prenda: ${this.state.garment.price}</h3>
                            </Segment>
                            <Input
                                label='Cantidad:'
                                min='1'
                                step='1'
                                onChange={this.setQuantity}
                                value={this.state.quantity}
                                type='number' />

                            <div style={{ margin: '10px', textAlign: 'right' }}>
                                <Header sub>Total</Header>
                                <h3 style={{ color: 'green' }}>${this.state.total}</h3>
                            </div>

                            <div style={{ margin: '10px', display: 'flex', bottom: 0 }}>
                                <Button label='Al carrito' icon='shop' onClick={() => {
                                    let { garment, quantity, total } = this.state;
                                    let compatibles = garment.compatibleGarmentList.filter(c => c.selected).map(c => {
                                        return {
                                            id: c.id,
                                            previewImage: c.previewImage,
                                            name: c.name                                            
                                        }});
                                    let lineaCarrito = {
                                        garmentId: garment.id,
                                        garmentName: garment.name,
                                        garmentDescription: garment.description,
                                        total,
                                        previewImage: garment.previewImage,
                                        quantity,
                                        compatibles,
                                        id: crypto.getRandomValues(new Uint32Array(4)).join('-')
                                    }
                                    let carrito = JSON.parse(localStorage.getItem('carrito'));
                                    if(carrito == null){
                                        carrito = {
                                            lineas: []
                                        }
                                    }
                                    carrito.lineas.push(lineaCarrito);
                                    localStorage.setItem('carrito', JSON.stringify(carrito));

                                    let ruta = window.location.href.split('#');
                                    window.location.href = ruta[0] + '#/garmentCatalog/' + garment.subcategory.id;  
                                }}
                                />
                                <Button
                                    label='Guardar'
                                    icon='save'
                                    disabled={!this.state.canSave}
                                    onClick={() => {
                                        let { garment } = this.state;
                                        let pg = {
                                            garmentId: garment.id,
                                            customerMail: JSON.parse(localStorage.getItem('logedUser')).mail,
                                            compatiblesIds: []
                                        }
                                        garment.compatibleGarmentList.filter(c => c.selected).forEach(c => {
                                            pg.compatiblesIds.push(c.id);
                                        });

                                        fetch(localStorage.getItem('url') + 'personalizedGarments/persist', {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json',
                                                'Access-Control-Allow-Origin': '*',
                                                'Authorization': localStorage.getItem('tokenSesion')
                                            },
                                            body: JSON.stringify(pg)
                                        }).then((res) => res.json())
                                            .then((r) => {
                                                utils.evalResponse(r, null, 'Prenda personalizada guardada')
                                            });
                                    }} />
                            </div>
                        </Segment.Group>

                    </Segment.Group>
                    {this.renderPersonalizeSection()}
                </div>

            )
        }

    }
}