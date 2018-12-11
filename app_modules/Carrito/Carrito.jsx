import React, { Component } from 'react'
import { Message, Item, Button, Divider, Image } from 'semantic-ui-react';

export default class Carrito extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carrito: JSON.parse(localStorage.getItem('carrito'))
        }
    }

    renderButtonEliminar(linea){
        if (this.props.mode == 'carrito') {
            return(
                <Button icon='trash' size='small' color='red' floated='right' onClick={() => {
                    let { carrito } = this.state;
                    carrito.lineas = carrito.lineas.filter(l => l.id != linea.id);
                    if (carrito.lineas.length == 0) {
                        carrito = null;
                    }
                    this.setState({ carrito });
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }} />
            )
        }
    }

    renderItems() {
        let { carrito } = this.state;
        return carrito.lineas.map(linea => {
            let rutaImagen = localStorage.getItem('url') + 'utilities/getFile/' + linea.previewImage;
            return (
                <Item key={linea.id}>
                    <Item.Image src={rutaImagen} />
                    <Item.Content>
                        <Item.Header>{linea.garmentName}</Item.Header>
                        <Item.Meta>
                            <span className='price' style={{ color: 'green' }}>${linea.total}</span>
                            <span>Cantidad:{" "}{linea.quantity}</span>
                        </Item.Meta>
                        <Item.Description>{linea.garmentDescription}</Item.Description>
                        {this.renderCompatibles(linea.compatibles)}
                        {this.renderButtonEliminar(linea)}
                    </Item.Content>

                </Item>
            )
        })
    }

    renderCompatibles(compatibles) {
        return compatibles.map(c => {
            let rutaImagen = localStorage.getItem('url') + 'utilities/getFile/' + c.previewImage;
            return (
                <Image key={c.id} src={rutaImagen} size='small' centered bordered style={{ display: 'inline' }} />
            )
        })
    }

    renderButton() {
        if (this.props.mode == 'carrito') {
            return (
                <Button primary floated='right' onClick={() => {
                    let ruta = window.location.href.split('#');
                    window.location.href = ruta[0] + '#/pedido';
                    this.props.close()
                }} >
                    Finalizar compra
                </Button>
            )
        }
    }

    render() {
        let { carrito } = this.state;
        if (carrito == null) {
            return (
                <Message
                    icon='shop'
                    header='¿Aún no decides que comprar?'
                    content='Prueba búscando en la parte superior junto a la lupa'
                />
            )
        }
        let total = 0;
        carrito.lineas.forEach(l => total += l.total);
        return (
            <div>
                <Item.Group divided>
                    {this.renderItems(carrito)}
                </Item.Group>
                <Divider horizontal>-</Divider>
                <h3 style={{ display: 'inline' }}>
                    Total: {"  "}
                </h3>
                <h3 style={{ color: 'green', display: 'inline' }}>
                    ${total}
                </h3>
                {this.renderButton()}
            </div>
        )
    }
}
