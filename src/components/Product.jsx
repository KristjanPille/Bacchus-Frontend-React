import React, {useCallback, useEffect} from "react";
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/et'
import useCountdown from "@rooks/use-countdown"
import {useParams} from "react-router";
import {trackPromise} from "react-promise-tracker";
import {ProductsApi} from "../services/ProductsApi";
import {TimeFunc} from "../utils/CountdownHandler";

function Product({ product, setActiveProduct, productsChange }) {

    function setLocale(biddingEndDate){
        moment.locale('et');
        return moment(biddingEndDate).format("YYYY-MM-DD HH:mm:ss");
    }

    let handleProducts;
    handleProducts = useCallback((productId) => {
        productsChange(productId);
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>product Name</th>
                    <th>End time</th>
                    <th>Bidding End Date</th>
                    <th>Time left</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{product.productName}</td>
                    <td>{product.productDescription}</td>
                    <td>{setLocale(product.biddingEndDate)}</td>
                    <td>{TimeFunc(product.biddingEndDate, product.productId, handleProducts)}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default Product;
