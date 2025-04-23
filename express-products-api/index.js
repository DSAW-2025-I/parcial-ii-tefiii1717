const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Datos en memoria
let products = [
  { id: 1, name: 'Laptop', price: 1500 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 100 }
];

// GET /products - Devuelve todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// GET /products/:id - Devuelve un producto por ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// POST /products - Agrega un nuevo producto
app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  // Verifica si el ID ya existe
  const exists = products.find(p => p.id === id);
  if (exists) {
    return res.status(400).json({ error: 'ID ya existe' });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Escucha en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
