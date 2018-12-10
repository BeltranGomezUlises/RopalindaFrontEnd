import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import * as utils from '../../utils.js';
export default class SearchExampleCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: {},
            value: ''
        }

        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleResultSelect(e, { value }) {
        console.log(value);        
    };

    handleSearchChange(e, { value }) {
        let baseRoute = localStorage.getItem('url') + "utilities/getFile/";
        this.setState({ isLoading: true, value });
        fetch(localStorage.getItem('url') + 'garments'
            + '?select=id,description,price,subcategory.name,active=true,previewImage,name%\''
            + value + '\''
            + '&from=0&to=10', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => res.json())
            .then((r) => {
                utils.evalResponse(r, () => {
                    let categories = new Set();
                    r.data.forEach(i => categories.add(i.subcategory_name));
                    let results = {};
                    categories.forEach(c => {
                        let res = r.data.filter(i => i.subcategory_name == c)
                            .map(i => {
                                return {
                                    title: i.name,
                                    description: i.description,
                                    image: baseRoute + i.previewImage,
                                    price: i.price
                                }
                            });
                        results[c] = {
                            name: c,
                            results: res
                        }
                    });
                    this.setState({ results, isLoading: false });
                })
            });
    }

    render() {
        const { isLoading, value, results } = this.state
        return (
            <Search
                category
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}    
                {...this.props}
            />
        )
    }
}
