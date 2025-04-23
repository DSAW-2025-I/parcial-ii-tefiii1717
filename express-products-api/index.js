const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos en memoria
let products = [
  { id: 1, name: 'Laptop', price: 1500 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Headphones', price: 200 }
];

// GET /products - Obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id - Obtener producto por ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// POST /products - Agregar nuevo producto
app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  if (products.find(p => p.id === id)) {
    return res.status(400).json({ error: 'El ID ya existe' });
  }

  if (!id || !name || price == null) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
