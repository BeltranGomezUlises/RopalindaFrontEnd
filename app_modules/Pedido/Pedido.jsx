import React, { Component } from 'react'
import {
    Segment, Step, Icon, Card,
    Button, Modal, Header, Message
} from 'semantic-ui-react';
import * as utils from '../../utils.js';
import AddressForm from './AddressForm.jsx';
import Carrito from '../Carrito/Carrito.jsx'
export default class Pedido extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            carrito: JSON.parse(localStorage.getItem('carrito')),
            active: 'truck',
            addresses: [],
            selectedAddress: null,
            selectedMethod: null,
            openModal: false
        }

        this.loadAddresses = this.loadAddresses.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ openModal: true })
    }

    closeModal() {
        this.setState({ openModal: false })
    }

    componentDidMount() {
        this.loadAddresses();
    }

    loadAddresses() {
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
            .then((r) => {
                this.setState({ loading: false });
                utils.evalResponse(r, () => {
                    this.setState({ addresses: r.data })
                });
            })
    }

    renderAddresses() {
        return this.state.addresses.map(p => {
            return (
                <Card>
                    <Card.Content>
                        <Card.Header>{p.street}{" "}{p.interiorNumber}{" ext."}{p.exteriorNumber}</Card.Header>
                        <Card.Meta>{p.colony}{" "}{p.cp}{" "}{p.city}{" "}{p.state}</Card.Meta>
                        <Card.Description>
                            {p.reference}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button primary onClick={() => {
                            this.setState({
                                active: 'payment',
                                selectedAddress: p
                            })
                        }}>
                            Seleccionar
                        </Button>
                    </Card.Content>
                </Card>
            )
        })
    }

    renderTruck() {
        if (this.state.active == 'truck') {
            return (
                <Segment loading={this.state.loading}>
                    <Card.Group>
                        {this.renderAddresses()}
                    </Card.Group>
                    <br />
                    <Button color='green' onClick={this.openModal}>
                        Nueva dirección
                    </Button>

                    <Modal
                        onClose={this.closeModal}
                        open={this.state.openModal}
                        onOpen={this.openModal}
                    >
                        <Header content='Nueva dirección' textAlign='center' />
                        <Modal.Content >
                            <AddressForm closeModal={this.closeModal} filter={this.loadAddresses} />
                        </Modal.Content>
                    </Modal>
                </Segment>
            )
        }
    }

    renderPayment() {
        if (this.state.active == 'payment') {
            return (
                <Segment loading={this.state.loading}>
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>Depósito o trasferencia</Card.Header>
                                <Card.Meta>Acreditado al día siguiente</Card.Meta>
                                <Icon name='money bill alternate' size='huge' />
                            </Card.Content>
                            <Card.Content extra>
                                <Button primary onClick={() => {
                                    this.setState({ selectedMethod: 'deposit', active: 'confirm' })
                                }}>
                                    Seleccionar
                        </Button>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Tarjeta</Card.Header>
                                <Card.Meta>Cargo inmediato</Card.Meta>
                                <Icon name='payment' floated='right' size='huge' />
                            </Card.Content>
                            <Card.Content extra>
                                <Button primary onClick={() => {
                                    this.setState({ selectedMethod: 'card', active: 'confirm' })
                                }}>
                                    Seleccionar
                        </Button>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Segment >
            )
        }
    }

    renderConfirm() {
        if (this.state.active == 'confirm') {
            return (<Segment loading={this.state.loading}>
                <Carrito mode='pedido' />
                {this.renderDepositMessage()}
                <Button primary onClick={() => {
                    if(this.state.selectedAddress == null){
                        this.setState({active: 'truck'});                        
                    }
                }}>Confirmar pedido</Button>
            </Segment >)
        }
    }

    renderDepositMessage() {
        if (this.state.selectedMethod == 'deposit') {
            return (
                <Message
                    icon='money bill alternate'
                    header='Datos de depósito o trasferencia se enviarán por correo electrónico'
                    content='Los pagos se acreditan al siguiente día hábil'
                />
            )
        }
    }

    render() {
        let { active } = this.state;
        return (
            <Segment>
                <Step.Group>
                    <Step active={active == 'truck'} link onClick={() => { this.setState({ active: 'truck' }) }}>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>Envío</Step.Title>
                            <Step.Description>Selecciona tu lugar de entrega</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={active == 'payment'} link onClick={() => { this.setState({ active: 'payment' }) }}>
                        <Icon name='payment' />
                        <Step.Content>
                            <Step.Title>Pago</Step.Title>
                            <Step.Description>Selecciona tu método de pago</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={active == 'confirm'}>
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
