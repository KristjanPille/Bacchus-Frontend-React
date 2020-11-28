import React, {useCallback, useEffect, useRef, useState} from "react";
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/et'
import {TimeFunc} from "../utils/CountdownHandler";
import Form from "./Form/Form";
import Alert from 'react-bootstrap/Alert'
import placeholder from "../gallery/placeholder-image.jpg";

function Product({ product, productsChange, resetProduct }) {

    function setLocale(biddingEndDate){
        moment.locale('et');
        return moment(biddingEndDate).format("YYYY-MM-DD HH:mm:ss");
    }

    const mounted = useRef(false);

    const [show, setShow] = useState(false);
    const [biddingEnded, setBiddingEnded] = useState(false);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    let handleProducts;
    handleProducts = useCallback((productId) => {
        setBiddingEnded(true);
        productsChange(productId);
    }, []);

    const showAlert = () => {
        setShow(true);
    }
    const { text } = product.productDescription;

    return (
        <>
            <div>
                { mounted.current === true && show &&
                <Alert style={{width: "100%"}} variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Congratulations!</Alert.Heading>
                    <p>You have successfully submitted your bid!</p>
                </Alert>
                }
                { biddingEnded &&
                <Alert style={{width: "100%"}} variant="danger">
                    <b>Bidding for this product has ended!</b>
                </Alert>
                }
                <div className="card">
                    <img src={placeholder} alt={"a"} style={{ width:"100%" }}/>
                    <h5>{product.productName}</h5>
                    <p >
                        {product.productDescription}
                    </p>
                    <p><b>Time left:</b> {TimeFunc(product.biddingEndDate, product.productId, handleProducts)}</p>

                </div>
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
