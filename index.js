const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ConnectBD = require('./server/connectionDB')
const corsConfig = require('./config/cors.config')

const Order = require('./models/pedido');
const Status = require('./models/status');
const Category = require('./models/category');

const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
require('dotenv').config()
app.use(cors(corsConfig));

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

app.get('/content/v1/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if(!order){
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
  
    const responseData = {
      order
    };
  
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

app.get('/content/v1/orders/status/:status', async (req, res) => {
  try {
    const status = req.params.status;
    // Garante que o filtro seja aplicado ao campo 'status' corretamente
    const orders = await Order.find({ status: status });

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Nenhum pedido encontrado com esse status' });
    }

    const responseData = {
      orders,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



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

app.get('/content/v1/status', async (req, res) => {
  try {
    const [ status ] = await Promise.all([
      Status.find(),
    ]);
  
    const responseData = {
      status
    };
  
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

app.get('/content/v1/category', async (req, res) => {
  try {
    const [ category ] = await Promise.all([
      Category.find(),
    ]);
  
    const responseData = {
      category
    };
  
    res.status(200).json(responseData);
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
