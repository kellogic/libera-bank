import HttpClient from './HttpClient';

export default class BankService {

    client = new HttpClient();

    async getBalance() {
        const res = await this.client.get('/balance');
        return res;
    }

    async getCoins() {
        const res = await this.client.get('/coins');
        console.log(res);
        return res || [];
    }

    async addCoins(quarter, dime, nickel, penny) {
        const data = {
            quarter,
            dime,
            nickel,
            penny
        }
        const res = await this.client.post('/addcoins', data);
        console.log(res);
        return res;
    }

    async replaceCoins(quarter, dime, nickel, penny) {
        const data = {
            quarter,
            dime,
            nickel,
            penny
        }
        const res = await this.client.put('/coins', data);
        console.log(res);
        return res;
    }

    async getChange(cents) {
        const data = {
            cents
        }
        const res = await this.client.post('/change', data);
        console.log(res);
        return res;
    }

}
