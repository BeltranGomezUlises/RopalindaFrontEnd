import React from 'react';
import { Loader, Message, Card, Icon, Image, Segment } from 'semantic-ui-react';
import {
    ImageContainer
} from '../../../styledcomponents/home';
import * as utils from '../../../utils.js';
import numeral from 'numeral';
export default class GarmentCatalog extends React.Component{

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

    findAll(subCategoryId) {
        this.setState({ loading: true });
        fetch(localStorage.getItem('url') + 'garments'
            + '?select=id,name,description,price,previewImage,active=true,subcategory.id=' + subCategoryId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
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
                <Card style={{ marginTop: '0', cursor: 'pointer', margin: '20px' }} key={garment.id}
                    onClick={() => {
                        let ruta = window.location.href.split('#');
                        window.location.href = ruta[0] + '#/' + 'detalle-prenda/' + garment.id;
                    }}
                >
                    <ImageContainer>
                        <Image
                            className="image-card"
                            style={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'all 0.25s' }}
                            src={localStorage.getItem('url') + 'utilities/getFile/' + garment.previewImage} />
                    </ImageContainer>
                    <Card.Content>
                        <Card.Header>{garment.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{garment.subcategory_name}</span>
                        </Card.Meta>
                        <Card.Description>
                            {garment.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                            <Icon name='dollar' />
                            {numeral(garment.price).format('0,0.00')}                        
                    </Card.Content>
                </Card>
            )
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Segment style={{minHeight: 400}}>
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
                            content='Esta categoría no cuenta con prendas'
                        />
                        <br />
                    </div>
                )
            } else {
                return (
                    <Card.Group style={{ justifyContent: 'center'}}>
                        {this.renderCollection()}
                    </Card.Group>
                )
            }
        }
    }
}