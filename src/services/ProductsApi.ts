import Axios from 'axios';
import {IProduct} from "../domain/IProduct";

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export abstract class ProductsApi {

    private static axios = Axios.create(
        {
            baseURL: PROXY_URL + "http://uptime-auction-api.azurewebsites.net/api/Auction",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
    )
    static async getAll(): Promise<IProduct[]> {
        const url = "";
        try {
            const response = await this.axios.get<IProduct[]>(url);
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
}
