import React, { Component } from 'react'
import List from './List.jsx';

export default class GarmentCatalog extends Component{

    constructor(props){
        super(props)
        this.state={
            garments: []
        }        
    }

    render(){
        return(
            <List subCategoryId={this.props.match.params.subCategoryId}/>
        )
    }
}