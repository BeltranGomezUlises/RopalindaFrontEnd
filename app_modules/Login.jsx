import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Segment, Divider, Header, Input, Form, Container} from 'semantic-ui-react';
import * as utils from '../utils.js';

export default class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      user: '',
      pass: '',
      message: '',
      loading:false
    }

    localStorage.setItem('tokenSesion', '');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handleSubmit(){
    fetch(localStorage.getItem('url') + 'access/login', {
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
      this.setState({loading: false});
      utils.evalResponse(response, () => {
        localStorage.setItem('tokenSesion', response.meta.metaData);
        localStorage.setItem('logedUser', JSON.stringify(response.data.userName));
        let ruta = window.location.href.split('#');
        window.location.href = ruta[0] + '#/formatos';
      }, response.meta.message);
    })
  }

  handleUserChange(evt){
    this.setState({user: evt.target.value});
  }

  handlePassChange(evt){
    this.setState({pass: evt.target.value});
  }

  renderMessage(){
    if (this.state.message !== '') {
      return (
        <Segment color='yellow'>
          {this.state.message}
        </Segment>
      )
    }
  }

  renderButton(){
    if (this.state.loading) {
      return(
          <Button fluid loading primary>Iniciar Sesion</Button>
      );
    }else{
      return(
        <Button fluid primary type='submit' onClick={()=>{this.setState({loading:true}); this.handleSubmit();}}>Iniciar Sesion</Button>
      );
    }
  }

  render(){
    return(
      <div>
        <Container text style={{'padding-top':'100px'}}>
          <Segment verticalalign='middle'>
            <Header textAlign='center' color='blue'>BonIce Admin</Header>
            <Divider section/>
              {this.renderMessage()}
              <Form size='large'>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Ingrese el usuario...' onChange={this.handleUserChange}/>
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handlePassChange}/>
                {this.renderButton()}
              </Form>
          </Segment>
        </Container>
      </div>
    )
  }
}
// onSubmit={this.handleSubmit}
