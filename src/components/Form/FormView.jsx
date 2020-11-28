import React from "react";
import '../../index.css';

const FormView = (props) => (
    <form id='my-form' onSubmit={(e) => props.handleSubmit(e)}>
        <div className="form-group" >
            <label htmlFor="email">First name</label>
            <input defaultValue={props.data.firstName} name="firstName" placeholder="First name" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="firstNameInput" required/>
        </div>
        <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input defaultValue={props.data.lastName} name="lastName" placeholder="Last name" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="lastNameInput" required/>
        </div>
        <div className="form-group">
            <label htmlFor="bidSize">Bid €</label>
            <input defaultValue={props.data.bidSize} name="bidSize" placeholder="Your bid" onChange={(e) => props.handleChange(e.target)} type="number" className="form-control" id="bidInput" required/>
        </div>
        <button type="submit" form='my-form' className="btn btn-warning font-weight-bold">Submit</button>
    </form>
);


export default FormView;
