import React, {useCallback} from "react";
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/et'
import useCountdown from "@rooks/use-countdown"

function Products({ parentProducts, productsChange, filteredProducts }) {


    const ProductsRow = (props) => (
        <tr>
            <td>{props.product.productName}</td>
            <td>{setLocale(props.product.biddingEndDate)}</td>
            <td>{TimeFunc(props.product.biddingEndDate, props.product.productId)}</td>
        </tr>
    );

    function TimeFunc(biddingEndDate, productId) {

        let endTime = new Date(biddingEndDate);

        let seconds =  useCountdown(endTime, {
            interval: 1000,
            onEnd: time => deleteProduct(productId),
        });
        return new Date(seconds * 1000).toISOString().substr(11, 8)
    }
    function setLocale(biddingEndDate){
        moment.locale('et');
        return moment(biddingEndDate).format("YYYY-MM-DD HH:mm:ss");
    }

    function deleteProduct(productId){
        handleProducts(productId)
    }

    const handleProducts= useCallback((productId) => {
        productsChange(productId);
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>product Name</th>
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
