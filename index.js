const express = require('express');
const bodyParser = require('body-parser');
import cors from 'cors';
const ConnectBD = require('./server/connectionDB')
const Order = require('./models/pedido');

const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
require('dotenv').config()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://techfixfr.vercel.app/")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  app.use(cors())
  next()
} )

app.get('/content/v1/orders', async (req, res) => {
    try {
      const [order] = await Promise.all([
        Order.find(),
      ]);
    
      const responseData = {
        order
      };
    
      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
})

app.post('/content/v1/neworders', async (req, res) => {
  try {
    const { name, address, number, cpf, email, devicedescription, defectdescription, category, status} = req.body;

    const newOrder = new Order({
      name,
      address,
      number,
      cpf,
      email,
      devicedescription,
      defectdescription,
      category,
      status,
    });

    const saveOrder = await newOrder.save();

    res.status(201).json({ order: saveOrder });

  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})


ConnectBD
const port = 3000;
app.listen(process.env.PORT || port,() => {
    console.log(`Aplicação rodando, porta:${port}`);
})
