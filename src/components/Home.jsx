import React from 'react';
import Products from "./Products";
import {ProductsApi} from "../services/ProductsApi";
import '../index.css';
import { trackPromise } from 'react-promise-tracker';
import Categories from "./Categories";
import Modal from 'react-modal';
import Product from "./Product";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activeProduct: {},
            filteredProducts: [],
            successfulBid: false,
            _isMounted: false,
            isPoppedOut: false,
            modalIsOpen: false,
        }
        this.closeModal = this.closeModal.bind(this);
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
        this.setState({ isPoppedOut: false });
        this.setState({ modalIsOpen: true })
    }

    resetProduct = () => {
        this.setState({ isPoppedOut: true });
        this.setState({ successfulBid: true });
        //this.closeModal();
    };

    openModal() {
        this.setState({ modalIsOpen: true })
    }

    closeModal(){
        this.setState({ modalIsOpen: false})
    }

    handleProducts = productId => {
        if(this.state._isMounted === true) {
            const itemIntList = this.state.products.find(item => item.productId === productId);

            if (this.state.filteredProducts.length > 0 && itemIntList !== undefined && itemIntList !== null) {
                const newList = [].concat(this.state.filteredProducts)
                newList.splice(itemIntList.index, 1);
                this.setState({filteredProducts: newList});
            }
            if (itemIntList !== undefined && itemIntList !== null) {
                const newList = [].concat(this.state.products)
                newList.splice(itemIntList.index, 1);
                this.setState({products: newList});
            }
        }
    }

    render() {
        return (
            <div className="flex-container" id={"parentDiv"}>
                { this.state._isMounted === true &&
                <Modal
                    appElement={document.getElementById("parentDiv")}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <Product
                        product={this.state.activeProduct}
                        productsChange={this.handleProducts}
                        resetProduct={this.resetProduct}
                    />
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
