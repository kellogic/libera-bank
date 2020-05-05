import bank from '../db/bank';

function getBalance(req, res) {
    const balance = bank.coins.reduce((sum, coin) => sum + coin.count * coin.value, 0);
    return res.json(balance/100);
}

function getCoins(req, res) {
    const coins = bank.coins.map(({name, count}) => { return { name, count } });
    return res.json(coins);
}

function addCoins(req, res) {
    const coins = req.body;
    bank.coins.forEach(coin => {
        coin.count += coins[coin.name] || 0;
    });
    return res.json('success');
}

function setCoins(req, res) {
    const coins = req.body;
    bank.coins.forEach(coin => {
        coin.count = coins[coin.name] || 0;
    });
    return res.json('success');
}

function getChange(req, res) {
    return res.json(makeChange(req.body.cents));
}

function makeChange(amt) {
    const change = [];
    const result = {
        code: 0,
        coins: change
    };
    bank.coins.forEach(coin => {
        if (amt >= coin.value) {
            let qty = (amt / coin.value) | 0;
            if (qty > coin.count) {
                qty = coin.count;
            }
            if (qty) {
                change.push({ name: coin.name, count: qty});
                amt -= qty * coin.value;
            }
        }
    })
    if (amt === 0) {
        // Remove coins
        change.forEach(coin => {
            const till = bank.coins.find(c => c.name === coin.name);
            if (till) {
                till.count -= coin.count;
            }
        })
    }
    else {
        result.code = 1;
        result.msg = 'Cannot make change';
    }

    return result;
}

export { getBalance, getCoins, addCoins, setCoins, getChange }