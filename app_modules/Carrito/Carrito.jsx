import React, { Component } from 'react'
import * as utils from '../../utils.js';

export default class SearchExampleCategory extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let carrito = JSON.parse(localStorage.getItem('carrito'));
        return (
            <div>
                mi pinche carro: {JSON.stringify(carrito)}
            </div>
        )
    }
}
