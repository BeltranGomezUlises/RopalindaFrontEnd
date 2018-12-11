import React from 'react';
import { Loader, Message, Card, Icon, Image, Segment, Button } from 'semantic-ui-react';
import {
    ImageContainer
} from '../../../styledcomponents/home';
import * as utils from '../../../utils.js';
import numeral from 'numeral';
export default class PersonalizedGarmentCatalog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collection: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.findAll(this.props.match.params.subCategoryId);
    }

    findAll() {
        this.setState({ loading: true });
        fetch(localStorage.getItem('url') + 'personalizedGarments'
            + '?select=id,active=true,garment.previewImage,garment.name,garment.description,garment.price,customer.mail=\''
            + JSON.parse(localStorage.getItem('logedUser')).mail + '\'', {
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

    componentWillReceiveProps(nextProps) {
        let { subCategoryId } = this.props.match.params;
        let nextSubCategoryId = nextProps.match.params.subCategoryId;
        if (subCategoryId != nextSubCategoryId) {
            this.findAll(nextSubCategoryId);
        }
    }



    renderCollection() {
        return this.state.collection.map((garment) => {
            return (
                <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={garment.id}>
                    <ImageContainer onClick={() => {
                        let ruta = window.location.href.split('#');
                        window.location.href = ruta[0] + '#/' + 'detalle-prenda-personalizada/' + garment.id;
                    }}>
                        <Image
                            className="image-card"
                            style={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'all 0.25s' }}
                            src={localStorage.getItem('url') + 'utilities/getFile/' + garment.garment_previewImage} />
                    </ImageContainer>
                    <Card.Content>
                        <Card.Header>{garment.garment_name}</Card.Header>
                        <Card.Description>
                            {garment.garment_description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='dollar' />
                        {numeral(garment.garment_price).format('0,0.00')}
                        <Button icon='trash' size='small' color='red' floated='right' onClick={() => {
                            fetch(localStorage.getItem('url') + 'personalizedGarments/'+ garment.id, {
                                method: 'DELETE',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*',
                                    'Authorization': localStorage.getItem('tokenSesion')
                                }
                            }).then((res) => res.json())
                            .then((response) => {
                                utils.evalResponse(response, () => {
                                    let {collection} = this.state;
                                    this.setState({collection: collection.filter(c => c.id != garment.id)})
                                });
                            })
                        }} />
                    </Card.Content>
                </Card>
            )
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Segment style={{ 'min-height': '400px' }}>
                    <Loader active size='big'>Cargando...</Loader>
                </Segment>
            )
        } else {
            if (this.state.collection.length == 0) {
                return (
                    <div>
                        <br />
                        <Message
                            warning
                            header='Sin elementos para mostrar!'
                            content='No tienes ninguna prenda personalizada'
                        />
                        <br />
                    </div>
                )
            } else {
                return (
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Mis prendas personalizadas</h2>
                        <Card.Group style={{ justifyContent: 'center' }}>
                            {this.renderCollection()}
                        </Card.Group>
                    </div>

                )
            }
        }
    }
}