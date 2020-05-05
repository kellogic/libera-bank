import express from 'express';
import cors from 'cors';
import api from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/', api);

app.get('/', (req, res) => res.send('Libera Bank'));

const port = 3005;
app.listen(port, () => console.log(`Libera Bank server running on port ${port}!`));