import React from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import * as utils from '../../utils.js';

export default class EntityForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            warningMessage: null,
            element: {
                interiorNumber: '',
                exteriorNumber: '',
                colony: '',
                city: '',
                state: '',
                street: '',
                cp: 0,
                reference: '',
                customer: {
                    mail: JSON.parse(localStorage.getItem('logedUser')).mail
                }
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({ loading: true });
        fetch(localStorage.getItem('url') + 'addresses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('tokenSesion')
            },
            body: JSON.stringify(this.state.element)
        }).then((res) => res.json())
            .then((r) => {
                this.setState({ loading: false });
                utils.evalResponse(r, () => {
                    this.props.closeModal();
                    this.props.filter();
                }, 'Dirección agregada con éxito.');
            })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Field control={Input} required label='Número interior:'
                            type='text' placeholder='Número interior del lugar...' maxLength='10'
                            value={this.state.element.interiorNumber}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.interiorNumber = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>
                        <Form.Field control={Input} required label='Número exterior:'
                            type='text' placeholder='Número exterior del lugar...' maxLength='10'
                            value={this.state.element.exteriorNumber}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.exteriorNumber = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>
                        <Form.Field control={Input} required label='Calle:'
                            type='text' placeholder='Calle del lugar...' maxLength='50'
                            value={this.state.element.street}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.street = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>


                        <Form.Field control={Input} required label='Colonia:'
                            type='text' placeholder='Colonia del lugar...' maxLength='50'
                            value={this.state.element.colony}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.colony = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field control={Input} required label='Ciudad:'
                            type='text' placeholder='Ciudad del lugar...' maxLength='50'
                            value={this.state.element.city}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.city = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>

                        <Form.Field control={Input} required label='Estado:'
                            type='text' placeholder='Estado del lugar...' maxLength='50'
                            value={this.state.element.state}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.state = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>
                        <Form.Field control={Input} required
                            label='Código postal:' type='number' placeholder='Código postal del lugar...'
                            value={this.state.element.cp}
                            min='1' max='9999999' step='1'
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.cp = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>
                        <Form.Field control={Input} required label='Referencia:'
                            type='text' placeholder='Referencia del lugar...' maxLength='255'
                            value={this.state.element.reference}
                            onChange={(evt) => {
                                let { element } = this.state;
                                element.reference = evt.target.value;
                                this.setState({ element });
                            }}
                        >
                        </Form.Field>
                    </Form.Group>
                    <br></br>
                    <Button color='green'
                        loading={this.state.loading}
                        type={this.state.loading ? 'button' : 'submit'}>
                        Agregar
                    </Button>
                </Form>
            </div>
        );
    }

}