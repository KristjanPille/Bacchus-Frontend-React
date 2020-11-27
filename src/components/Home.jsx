import React from 'react';
import Products from "./Products";
import {ProductsApi} from "../services/ProductsApi";
import '../index.css';
import { trackPromise } from 'react-promise-tracker';
import Categories from "./Categories";
import Product from "./Product";
import Button from 'react-bootstrap/Button';
import 'reactjs-popup/dist/index.css';
import Modal from "bootstrap/js/dist/modal";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activeProduct: {},
            filteredProducts: [],
            _isMounted: false,
            isPoppedOut: false
        }
    }


    // Make only one api call and send result down to children components
    async componentDidMount() {
        this.setState({ _isMounted: true })
        await trackPromise(
            ProductsApi.getAll()
                .then((productApiList) => {
                    this.setState({ products: productApiList })
                }));
    }

    componentWillUnmount() {
        this.setState({ _isMounted: false })
    }

    filterProducts = async filteredProducts => {
        this.setState({ filteredProducts })
    }

    popupClosed() {
        this.setState({ activeProduct: {} });
    }

    setProduct = activeProduct => {
        this.setState({ activeProduct })
    }


    handleProducts = productId => {
        if(this.state._isMounted === true){
        const itemIntList = this.state.products.find(item => item.productId === productId);

        if(this.state.filteredProducts.length > 0){
            const newList = [].concat(this.state.filteredProducts)
            newList.splice(itemIntList.index, 1);
            this.setState({ filteredProducts: newList });
        }

        const newList = [].concat(this.state.products)
        newList.splice(itemIntList.index, 1);
        this.setState({ products: newList });
        }
    }

    render() {
        return (
            <div className="flex-container">

                { this.state.activeProduct &&


                <Modal show={this.state.activeProduct !== undefined} onHide={this.setState({activeProduct: {}})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Product
                            setActiveProduct={this.setProduct}
                            product={this.state.activeProduct}
                            productsChange={this.handleProducts}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.setState({activeProduct: {}})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                }

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
                        setActiveProduct={this.setProduct}
                    />
                </div>

            </div>

        );
    }
}
