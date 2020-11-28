import React, {useCallback, useEffect, useRef, useState} from "react";
import moment from 'moment/min/moment-with-locales';
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

    const ProductsRow = (props) => (
            <div className="card">
                <img src={placeholder} alt={"a"} style={{ width:"100%" }}/>
                    <h5>{props.product.productName}</h5>
                    <p>{props.product.productDescription}</p>
                    { mounted.current === true &&
                    <p><b>Time left:</b> {TimeFunc(props.product.biddingEndDate, props.product.productId, handleProducts)}</p>
                    }
                    <p>
                        <button onClick={()=>setProductToBeActive(props.product)}>Bid</button>
                    </p>
            </div>
    );

    const setProductToBeActive = useCallback((product) => {
        setActiveProduct(product);
    }, []);


    let handleProducts;
    handleProducts = useCallback((productId) => {
        productsChange(productId);
    }, [1]);

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
