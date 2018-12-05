import React from 'react';
import { Button, Segment, Divider, Form } from 'semantic-ui-react';
import * as utils from '../../utils.js';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: '',
      pass: '',
      message: '',
      loading: false
    }

    localStorage.setItem('tokenSesion', '');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    fetch(localStorage.getItem('url') + 'clientes/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: this.state.user,
        pass: this.state.pass,
      })
    }).then((res) => res.json())
      .then((response) => {
        this.setState({ loading: false });
        utils.evalResponse(response, () => {
          localStorage.setItem('tokenSesion', response.meta.metaData);
          localStorage.setItem('logedUser', JSON.stringify(response.data.userName));
        }, response.meta.message);
      })
  }

  handleUserChange(evt) {
    this.setState({ user: evt.target.value });
  }

  renderMessage() {
    if (this.state.message !== '') {
      return (
        <Message
          warning
          header='Atención!'
          content={this.state.message}
        />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
        <Form size='large'>
          <Form.Input
            label='Correo:'
            fluid icon='user'
            iconPosition='left'
            placeholder='Ingrese el usuario'
            onChange={(evt) => { this.setState({ user: evt.target.value }) }} />
          <Form.Input
            label='Contraseña:'
            fluid icon='lock' iconPosition='left'
            placeholder='Ingrese su contraseña' type='password'
            onChange={(evt) => { this.setState({ pass: evt.target.value }) }} />
          <Button fluid primary
            loading={this.state.loading}
            type={this.state.loading == true ? 'button' : 'submit'}
            onClick={() => {
              this.setState({ loading: true });
              this.handleSubmit();
            }}>
            Iniciar sesión
          </Button>
          <br></br>
          <Divider horizontal>¿NUEVO EN ROPALINDA?</Divider>
          <Button fluid secondary onClick={() => {
            let ruta = window.location.href.split('#');
            window.location.href = ruta[0] + '#/prospectiveCustomerRegister';
            this.props.close();
          }}>
            Crea tu cuenta
          </Button>
          <br></br>
          <div style={{ textAlign: 'center' }}>
            <a href='/#/recuperar' onClick={() => {
              this.props.close();
            }}>¿Recuperar contraseña?</a>
          </div>
        </Form>
      </div>
    )
  }
}
