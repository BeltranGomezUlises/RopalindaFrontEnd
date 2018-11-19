import React from 'react';
import { Loader, Message, Table } from 'semantic-ui-react';
import * as utils from '../../../utils.js';

export default class CompatibleGarments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collection: [],
            loading: true
        };
    }

    componentDidMount() {
        this.loadCompatibleGarments();
    }

    loadCompatibleGarments() {
        fetch(localStorage.getItem('url') + 'compatibleGarments',{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIn0.kJdFAfN1eP6-4vEjv0lTRVsmj4L3RAJ60nl3vJFAfoLAK5tSkf-Qh-B8lyerGnA9oFnQIlVrEXj9xrYV6RKzLQ'
            }
          }).then((res)=> res.json())
          .then((response) =>{
            this.setState({loading:false});
            utils.evalResponse(response, () => {    
                this.setState({collection: response.data})                        
            });
          })
    }

    renderCollection() {
        return this.state.collection.map( (e) => {
            return(
                <Table.Row key={e.id}>
                    <Table.Cell>{e.id}</Table.Cell>
                    <Table.Cell>{e.name}}</Table.Cell>
                    <Table.Cell>{e.description}</Table.Cell>                    
                </Table.Row>
            )
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader active size='big'>Cargando...</Loader>
            )
        } else {
            if (this.state.collection.length == 0) {
                return(<Message
                    warning
                    header='Sin elementos para mostrar!'
                    content='Intente agregar elementos'
                />)
            } else {
                return (
                    <Table compact celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>id</Table.HeaderCell>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>description</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderCollection()}
                        </Table.Body>
                    </Table>
                )
            }
        }
    }
}
