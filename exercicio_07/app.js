import axios from 'axios';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const api = new Freecurrencyapi('fca_live_czifQvLxhEZPtAWsh06kKQ8YVFAMU5hMOldfGUvi');

// Recriar __dirname no ambiente ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const bit = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const updatedTime = bit.data.time.updated;
    const usd = parseFloat(bit.data.bpi.USD.rate.replace(',', ''));

    try {
      const taxas = await api.latest({
        base_currency: 'USD',
      });

      const taxaUSDEUR = taxas.data.EUR;
      const taxaUSDGBP = taxas.data.GBP;

      const eur = usd * taxaUSDEUR;
      const gbp = usd * taxaUSDGBP;

      res.render('index', {
        usd: usd.toFixed(2),
        eur: eur.toFixed(2),
        gbp: gbp.toFixed(2),
        updatedTime,
      });
    } catch (erro) {
      console.error('Erro ao realizar a conversão:', erro);

      res.render('index', {
        usd: usd.toFixed(2),
        eur: 'Erro',
        gbp: 'Erro',
        updatedTime,
      });
    }
  } catch (err) {
    console.log(err);
    res.send('Erro ao obter o valor do Bitcoin');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
