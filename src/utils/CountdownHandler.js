import useCountdown from "@rooks/use-countdown";
import React from "react";
import 'moment/locale/et'

export const TimeFunc = (biddingEndDate, productId, handleProducts) => {

    let endTime = new Date(biddingEndDate);

    let seconds =  useCountdown(endTime, {
        interval: 1000,
        onEnd: time => handleProducts(productId),
    });
    return new Date(seconds * 1000).toISOString().substr(14, 5)
};
