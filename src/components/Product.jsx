import React, {useCallback, useEffect, useRef, useState} from "react";
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/et'
import {TimeFunc} from "../utils/CountdownHandler";
import Form from "./Form/Form";
import Alert from 'react-bootstrap/Alert'

function Product({ product, productsChange, resetProduct }) {

    function setLocale(biddingEndDate){
        moment.locale('et');
        return moment(biddingEndDate).format("YYYY-MM-DD HH:mm:ss");
    }

    const mounted = useRef(false);

    const [show, setShow] = useState(false);

    useEffect(() => {
        mounted.current = true;

        return () => { mounted.current = false; };
    }, []);

    let handleProducts;
    handleProducts = useCallback((productId) => {
        productsChange(productId);
    }, []);

    const showAlert = () => {
        setShow(true);
    }

    return (
        <>
            <div>
                { mounted.current === true && show &&
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Congratulations! You have successfully submitted your bid!</Alert.Heading>
                </Alert>
                }
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>product Name</th>
                    <th>Description</th>
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
                <Form
                    product={product}
                    resetActiveProduct={resetProduct}
                    showAlert={showAlert}
                />
            </div>
        </>
    )
}

export default Product;
