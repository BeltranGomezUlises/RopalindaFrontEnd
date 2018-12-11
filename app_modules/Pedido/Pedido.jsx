import React, { Component } from 'react'
import { Segment, Step, Icon, Input, Form } from 'semantic-ui-react';
import PaymentCard from 'react-payment-card-component'
import * as utils from '../../utils.js';

export default class Pedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            carrito: JSON.parse(localStorage.getItem('carrito')),
            active: 'truck',
            addresses: [],
            nombre: '',
            numeroTarjeta: '',
            tipoTarjeta: 'visa',
            fecha: '',
            flipped: false,
            cvv: '',
            limit: 16
        }
    }

    componentDidMount() {
        this.loadAddress();
    }

    loadAddress() {
        let user = JSON.parse(localStorage.getItem('logedUser'));
        fetch(localStorage.getItem('url') + 'addresses'
            + '?select=id,interiorNumber,exteriorNumber,'
            + 'street,colony,city,state,cp,reference,'
            + 'active=true,customer.mail=\'' + user.mail + '\'', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': localStorage.getItem('tokenSesion')
                }
            }).then((res) => res.json())
            .then((response) => {
                this.setState({ loading: false });
                utils.evalResponse(response, () => {
                    this.setState({ collection: response.data })
                });
            })
    }

    renderAddresses() {
        return this.state.addresses.map(p => {
            return (
                <p>{JSON.stringify(p)}</p>
            )
        })
    }

    renderTruck() {
        if (this.state.active == 'truck') {
            return (
                <Segment loading={this.state.loading}>
                    {this.renderAddresses()}
                </Segment>
            )
        }
    }

    renderPayment() {

    }

    renderConfirm() {

    }

    validateType() {
        let { numeroTarjeta } = this.state;
        if (numeroTarjeta.substring(0, 1) == 4) {
            console.log('si')
            this.setState({
                limit: 19,
                tipoTarjeta: 'visa'
            })
        } else {
            console.log('no')
            this.setState({
                limit: 16,
                tipoTarjeta: 'mastercard'
            })
        }
    }

    checkCVV() {
        if (this.state.cvv.length == 3) {
            this.setState({
                flipped: false
            })
        }
    }

    render() {
        let { active } = this.state;
        return (
            <Segment>
                <Step.Group>
                    <Step active={active == 'truck'}>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>Envío</Step.Title>
                            <Step.Description>Selecciona tu lugar de entrega</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={active == 'payment'}>
                        <Icon name='payment' />
                        <Step.Content>
                            <Step.Title>Pago</Step.Title>
                            <Step.Description>Selecciona tu método de pago</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={active == 'info'}>
                        <Icon name='info' />
                        <Step.Content>
                            <Step.Title>Confirmación</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>

                {this.renderTruck()}
                {this.renderPayment()}
                {this.renderConfirm()}
                <Segment style={{ width: '100%', display: 'inline-flex', justifyContent: 'center' }}>
                    <PaymentCard
                        bank="default"
                        brand={this.state.tipoTarjeta}
                        number={this.state.numeroTarjeta}
                        cvv={this.state.cvv}
                        holderName={this.state.nombre}
                        expiration={this.state.mes + '/' + this.state.anio}
                        flipped={this.state.flipped}
                    />
                    <Form style={{ marginLeft: 20 }}>
                        <Form.Field>
                            <label>Nombre:</label>
                            <Input
                                maxLength='20'
                                onChange={(evt) => { this.setState({ nombre: evt.target.value }) }}
                                value={this.state.nombre} />
                        </Form.Field>
                        <Form.Field>
                            <label>Numero de tarjeta:</label>
                            <Input
                                maxLength={this.state.limit}
                                onChange={(evt) => {
                                    this.setState({ numeroTarjeta: evt.target.value })
                                    this.validateType()
                                }}
                                value={this.state.numeroTarjeta} />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <label>Fecha de expiración:</label>
                                <Form.Group>
                                    <Input
                                    type='number'
                                    maxLength='2'
                                    onChange={(evt) => {
                                        let valor = evt.target.value;
                                        if(valor>0 && valor < 13)
                                        this.setState({ mes: valor })
                                    }}
                                    value={this.state.mes} />
                                    <label style={{ margin: 10}}>/</label>
                                    <Input
                                    type='number'
                                    maxLength='2'
                                    onChange={(evt) => {
                                        let valor = evt.target.value;
                                        if(valor>17 && valor < 100)
                                        this.setState({ anio: valor })
                                    }}
                                    value={this.state.anio} />
                                </Form.Group>
                                
                            </Form.Field>
                            <Form.Field>
                                <label>CVV:</label>
                                <Input
                                    maxLength='3'
                                    onChange={(evt) => {
                                        this.setState({
                                            flipped: true,
                                            cvv: evt.target.value
                                        })
                                        this.checkCVV()
                                    }}
                                    value={this.state.cvv} />
                            </Form.Field>
                        </Form.Group>

                    </Form>
                </Segment>

            </Segment>
        )
    }

}
