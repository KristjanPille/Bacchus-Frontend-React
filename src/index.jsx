import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {usePromiseTracker} from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="red" height="100" width="100" />
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <LoadingIndicator/>
    </React.StrictMode>,
    document.getElementById('root')
);
