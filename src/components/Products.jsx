import React, {useCallback, useEffect, useRef, useState} from "react";
import 'moment/locale/et'
import placeholder from '../../src/gallery/placeholder-image.jpg'
import {TimeFunc} from "../utils/CountdownHandler";
import '../../src/index.css';

function Products({ parentProducts, productsChange, filteredProducts, setActiveProduct }) {

    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => { mounted.current = false; };
    }, []);

    const setProductToBeActive = useCallback((product) => {
        setActiveProduct(product);
    }, []);

    let handleProducts;
    handleProducts = useCallback((productId) => {
        productsChange(productId);
    }, []);

    const ProductsRow = (props) => (
            <div className="card border-dark mb-4">
                <div className="card-body">
                    <img className="card-img-top" src={placeholder} alt={"a"} style={{ width:"100%" }}/>
                    <h5 className="card-title font-weight-bold small">{props.product.productName}</h5>

                    { mounted.current === true &&
                    <p className="card-text"><b>Time left:</b> {TimeFunc(props.product.biddingEndDate, props.product.productId, handleProducts)}</p>
                    }
                    <button onClick={()=>setProductToBeActive(props.product)}>Bid</button>
                </div>
            </div>
    );


    return (
        <>
            <div className="wrap">
                {filteredProducts.length === 0 ? (
                    parentProducts.map(product =>
                        <ProductsRow product={product} key={product.productId}/>
                    )
                ) : (
                    filteredProducts.map(product =>
                        <ProductsRow product={product} key={product.productId}/>
                    )
                )}
            </div>
        </>
    )
}

export default Products;
