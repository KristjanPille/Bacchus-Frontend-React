import React, {useCallback, useState} from "react";
import FormView from "./FormView";
import moment from "moment";
import {BidsApi} from "../../services/BidsApi";

const Form = (props) => {
    const [state, setState] = useState(
        {
            firstName: '',
            lastName: '',
            bidSize: null,
            submitted: false,
        }
    );

    const handleChange = (target) => {
        if (target.type === 'text') {
            setState({ ...state, [target.name]: target.value });
        }
        if (target.type === 'number') {
            setState({ ...state, [target.name]: target.value });
        }
    }

    function isBidDoneBeforeEnd(){

        let endDate = moment(props.product.biddingEndDate);
        let bidDate = moment();

        return bidDate <= endDate;

    }

    function saveBid(){
        if(isBidDoneBeforeEnd()){
            let bid = {
                productId: props.product.productId,
                productName: props.product.productName,
                bidderFirstName: state.firstName,
                bidderLastName: state.lastName,
                biddingEndDate: props.product.biddingEndDate,
                bidDate: moment().format("DD-MM-YYYY hh:mm:ss").toString(),
                bid: Number(state.bidSize)
            }
            props.showAlert();
            BidsApi.create(bid).then(r => r);
        }
    }

    const handleSubmit = (event) => {
        props.resetActiveProduct();
        event.preventDefault();
        setState({ ...state, submitted: true });
        saveBid();
    };

    return (
        <>
            <FormView data={state} handleChange={handleChange} handleSubmit={handleSubmit}/>
        </>
    );
}

export default Form;
