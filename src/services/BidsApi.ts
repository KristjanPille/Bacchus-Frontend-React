import Axios from 'axios';
import {IBid} from "../domain/IBid";

export abstract class BidsApi {
    private static axios = Axios.create(
        {
            baseURL: "http://localhost:3000/bids",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )
    static async getAll(): Promise<IBid[]> {
        const url = "";
        try {
            const response = await this.axios.get<IBid[]>(url);
            console.log('getAll response', response);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async create(bid: IBid): Promise<void> {
        const url = "";
        console.log(bid)
        try {
            const response = await this.axios.post<IBid>(url, bid)
            console.log('update response', response);
            if (response.status === 200) {
                return
            }
            return
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }
}
