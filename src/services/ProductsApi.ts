import Axios from 'axios';
import {IProduct} from "../domain/IProduct";

export abstract class ProductsApi {

    private static axios = Axios.create(
        {
            baseURL: 'https://cors-anywhere.herokuapp.com/' + "http://uptime-auction-api.azurewebsites.net/api/Auction",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
    )
    static async getAll(): Promise<IProduct[]> {
        const url = "";
        try {
            const response = await this.axios.get<IProduct[]>(url);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            return [];
        }
    }
}
