import express from 'express';
import { getBalance, getCoins, setCoins, addCoins, getChange } from '../controllers/bankController';
const router = express.Router();

router.get('/balance', getBalance);
router.get('/coins', getCoins);
router.put('/coins', setCoins);
router.patch('/coins', addCoins);
router.post('/addcoins', addCoins);
router.post('/change', getChange);

export default router;