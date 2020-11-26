import React from 'react';
import Products from "./Products";
import {ProductsApi} from "../services/ProductsApi";
import '../index.css';
import { trackPromise } from 'react-promise-tracker';
import Categories from "./Categories";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: [],
            _isMounted: false
        }
    }

    // Make only one api call and send result down to children components
    async componentDidMount() {
        this.setState({_isMounted: true})
        await trackPromise(
            ProductsApi.getAll()
                .then((productApiList) => {
                    this.setState({products: productApiList})
                }));
    }

    componentWillUnmount() {
        this.setState({_isMounted: false})
    }

    handleProducts = productId => {
        if(this.state._isMounted === true){
        const item = this.state.products.find(item => item.productId === productId)
        const newList = [].concat(this.state.products) // Clone array with concat or slice(0)
        newList.splice(item.index, 1);
        this.setState({products: newList});
        }
    }

    filterProducts = async filteredProducts => {
        this.setState({ filteredProducts })
    }

    render() {
        return (
            <div className="flex-container">

                <div className="flex-child magenta">
                    <Categories
                        parentProducts={this.state.products}
                        filteredProducts={this.state.filteredProducts}
                        filterProducts={this.filterProducts}
                    />
                </div>

                <div className="flex-child green">
                    <Products
                        parentProducts={this.state.products}
                        productsChange={this.handleProducts}
                        filteredProducts={this.state.filteredProducts}
                    />
                </div>

            </div>

        );
    }
}
