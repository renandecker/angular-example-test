const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store for tasks / products
let items = [
  { id: 1, title: 'Aprender Angular Standalone Components', completed: true, description: 'Estudar arquitetura moderna sem módulos em Angular.' },
  { id: 2, title: 'Criar API REST em Node.js / Express', completed: true, description: 'Desenvolver endpoints CRUD para o backend.' },
  { id: 3, title: 'Integrar Frontend e Backend', completed: false, description: 'Conectar HttpClient do Angular com a API Express.' }
];

let nextId = 4;

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET single item by id
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item não encontrado' });
  res.json(item);
});

// POST create item
app.post('/api/items', (req, res) => {
  const { title, description, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'O título é obrigatório' });
  }
  const newItem = {
    id: nextId++,
    title,
    description: description || '',
    completed: completed || false
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item não encontrado' });

  const { title, description, completed } = req.body;
  items[index] = {
    ...items[index],
    title: title !== undefined ? title : items[index].title,
    description: description !== undefined ? description : items[index].description,
    completed: completed !== undefined ? completed : items[index].completed
  };

  res.json(items[index]);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item não encontrado' });

  const deletedItem = items.splice(index, 1)[0];
  res.json(deletedItem);
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
