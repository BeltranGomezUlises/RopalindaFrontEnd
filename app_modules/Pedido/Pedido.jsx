import React, { Component } from 'react'
import { Segment, Step, Icon } from 'semantic-ui-react';
import * as utils from '../../utils.js';

export default class Pedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            carrito: JSON.parse(localStorage.getItem('carrito')),
            active: 'truck',
            addresses: []
        }
    }

    componentDidMount(){
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
                    'Authorization':localStorage.getItem('tokenSesion')
                }
            }).then((res) => res.json())
            .then((response) => {
                this.setState({ loading: false });
                utils.evalResponse(response, () => {
                    this.setState({ collection: response.data })
                });
            })
    }

    renderAddresses(){
        return this.state.addresses.map(p => {
            return(
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

    renderPayment(){

    }

    renderConfirm(){

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
            </Segment>
        )
    }

}
