import React, { Component } from 'react'
import {
    Segment, Step, Icon, Card,
    Button, Modal, Header, Message, Form, Input
} from 'semantic-ui-react';
import PaymentCard from 'react-payment-card-component'
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
            selectedAddress: null,
            selectedMethod: null,
            openModal: false,
            nombre: '',
            numeroTarjeta: '',
            tipoTarjeta: 'visa',
            fecha: '',
            flipped: false,
            cvv: '',
            limit: 16,
            addresses: [],
            paymentType: 0
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
                                    this.setState({ selectedMethod: 'deposit', paymentType: 0 })
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
                                    this.setState({ selectedMethod: 'card', paymentType: 1 })
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

    renderCard() {
        if (this.state.selectedMethod == 'card') {
            return (
                <div>
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
                            <Form.Field required>
                                <label>Nombre:</label>
                                <Input
                                    maxLength='20'
                                    onChange={(evt) => { this.setState({ nombre: evt.target.value }) }}
                                    value={this.state.nombre} />
                            </Form.Field>
                            <Form.Field required>
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
                                <Form.Field required>
                                    <label>Fecha de expiración:</label>
                                    <Form.Group>
                                        <Input
                                            type='number'
                                            maxLength='2'
                                            onChange={(evt) => {
                                                let valor = evt.target.value;
                                                if (valor > 0 && valor < 13)
                                                    this.setState({ mes: valor })
                                            }}
                                            value={this.state.mes} />
                                        <label style={{ margin: 10 }}>/</label>
                                        <Input
                                            type='number'
                                            maxLength='2'
                                            onChange={(evt) => {
                                                let valor = evt.target.value;
                                                if (valor > 17 && valor < 100)
                                                    this.setState({ anio: valor })
                                            }}
                                            value={this.state.anio} />
                                    </Form.Group>

                                </Form.Field>
                                <Form.Field required>
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
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            color='green'
                            onClick={() => { this.setState({ active: 'confirm', selectedMethod: null }) }}
                            fluid>
                            Check
            </Button>
                    </div>

                </div>
            )
        }
    }

    renderConfirm() {
        if (this.state.active == 'confirm') {
            return (<Segment loading={this.state.loading}>
                <Carrito mode='pedido' />
                {this.renderDepositMessage()}
                <Button primary onClick={() => {
                    if (this.state.selectedAddress == null) {
                        this.setState({ active: 'truck' });
                    }
                    let lineas = [];
                    JSON.parse(localStorage.getItem('carrito')).lineas.forEach(element => {
                        let ids = element.compatibles.map(i => i.id)
                        lineas.push({
                            garmentId: element.garmentId,
                            quantity: element.quantity,
                            compatibleIds: ids
                        })
                    });
                    let objeto = {
                        customerMail: JSON.parse(localStorage.getItem('logedUser')).email,
                        customerAddressId: this.state.selectedAddress.id,
                        paymentType: this.state.paymentType,
                        paymentData: this.state.paymentType == 1 ? JSON.stringify({
                            nombre: this.state.nombre,
                            numero: this.state.numeroTarjeta,
                            fecha: this.state.mes + '/' + this.state.anio,
                            cvv: this.state.cvv
                        }) : '',
                        lines: lineas
                    }
                    fetch(localStorage.getItem('url') + 'orders/persist', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Authorization': localStorage.getItem('tokenSesion')
                            },
                            body: JSON.stringify(objeto)
                        }).then((res) => res.json())
                        .then((r) => {
                            this.setState({ loading: false });
                            utils.evalResponse(r, () => {
                                //TODO
                            });
                        })

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
                    <Step active={active == 'truck'} link onClick={() => {
                        this.setState({
                            active: 'truck',
                            selectedMethod: null
                        })
                    }}>
                        <Icon name='truck' />
                        <Step.Content>
                            <Step.Title>Envío</Step.Title>
                            <Step.Description>Selecciona tu lugar de entrega</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={active == 'payment'} link onClick={() => {
                        this.setState({
                            active: 'payment',
                            selectedMethod: null
                        })
                    }}>
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
                {this.state.selectedMethod ? this.renderCard() : this.renderPayment()}
                {this.renderConfirm()}

            </Segment>
        )
    }

}
