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
import * as utils from '../../utils.js';
import numeral from 'numeral';
export default class GarmentDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            garment: {},
            activeImage: '',
            canSave: false
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
                            activeImage: localStorage.getItem('url') + 'utilities/getFile/' + r.data.previewImage
                        })
                })
            });
    }
    renderCompatibleGarments() {
        let { garment } = this.state;
        return garment.compatibleGarmentList.map(i => {
            return (
                <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={i.id} onClick={() => {
                    i.selected = !i.selected;
                    this.setState({ garment: garment });
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
                    key={i.id}
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

    renderPreviewImage(){
        this.setState({
            activeImage: localStorage.getItem('url')+'utilities/getFile/'+ this.state.garment.previewImage
        })
    }

    checkSaveButton() {
        let lista = this.state.garment.compatibleGarmentList;
        let save = lista.filter(i => i.selected)
        this.setState({
            canSave: save.length > 0
        })

    }

    render() {
        return (
            <div style={{paddingTop: '10px'}}>
                <h2 style={{textAlign:'center'}}>Detalle de prenda</h2>
                <Segment.Group horizontal style={{ justifyContent: 'center' }}>
                    <div style={{ maxWidth: 70, marginTop: '15px', marginRight: '5px' }}>
                        {this.state.garment.imagesList ? this.renderGarmentImages() : <div/>}
                    </div>

                    <Card image={this.state.activeImage} />
                    <Segment.Group>
                        <Segment>
                            <h2>{this.state.garment.name}</h2>
                            <h4>{this.state.garment.description}</h4>
                            <Icon name='dollar' />
                            {this.state.garment.price}
                        </Segment>
                        <Input
                            defaultValue='1'
                            label='Cantidad:'
                            min='1'
                            type='number' />
                        <div style={{ margin: '10px', display: 'flex', bottom: 0, position: 'absolute' }}>
                            <Button label='Agregar al carrito' icon='shop' />
                            <Button
                                label='Guardar prenda'
                                icon='save'
                                disabled={!this.state.canSave} />
                        </div>
                    </Segment.Group>

                </Segment.Group>
                <h2 style={{textAlign:'center'}}>Personaliza tu prenda</h2>

                <Card.Group itemsPerRow='8' style={{ justifyContent: 'center' }}>
                    {this.state.garment.compatibleGarmentList ? this.renderCompatibleGarments() : <div />}
                </Card.Group>
            </div>

        )
    }
}