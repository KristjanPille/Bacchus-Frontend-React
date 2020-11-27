import React, {useCallback} from "react";
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/et'
import {Link} from "react-router-dom";
import {TimeFunc} from "../utils/CountdownHandler";

function Products({ parentProducts, productsChange, filteredProducts, setActiveProduct }) {

    const ProductsRow = (props) => (
        <tr>
            <td onClick={()=>setProductToBeActive(props.product)}>{props.product.productName}</td>
            <td>{setLocale(props.product.biddingEndDate)}</td>
            <td>{TimeFunc(props.product.biddingEndDate, props.product.productId, handleProducts)}</td>
        </tr>
    );

    function setLocale(biddingEndDate){
        moment.locale('et');
        return moment(biddingEndDate).format("YYYY-MM-DD HH:mm:ss");
    }

    const setProductToBeActive = useCallback((product) => {
        setActiveProduct(product);
    }, []);


    let handleProducts;
    handleProducts = useCallback((productId) => {
        productsChange(productId);
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name of product</th>
                    <th>End time</th>
                    <th>Time left</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length === 0 ? (
                    parentProducts.map(product =>
                        <ProductsRow product={product} key={product.productId}/>
                    )
                ) : (
                    filteredProducts.map(product =>
                        <ProductsRow product={product} key={product.productId}/>
                    )
                )}
                </tbody>
            </table>
        </>
    )
}

export default Products;
