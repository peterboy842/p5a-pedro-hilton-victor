const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3333;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

app.use(cors());
app.use(bodyParser.json());

// Simple in-memory users store for development
const users = [];
const receives = [];
let nextId = 1;
let nextReceiveId = 1;

function generateToken(user){
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(req, res, next){
  const auth = req.headers['authorization'] || '';
  const parts = auth.split(' ');
  if(parts.length !== 2) return res.status(401).json({ error: 'Token error' });

  const [ scheme, token ] = parts;
  if(!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Malformed token' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    next();
  })
}

// POST /users -> register
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  const exists = users.find(u => u.email === email);
  if(exists) return res.status(409).json({ error: 'User already exists' });

  const hashed = await bcrypt.hash(password, 8);
  const user = { id: nextId++, name, email, password: hashed };
  users.push(user);

  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

// POST /login -> authenticate
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const user = users.find(u => u.email === email);
  if(!user) return res.status(401).json({ error: 'User not found' });

  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user);

  return res.json({ id: user.id, name: user.name, token });
});

// GET /me -> protected
app.get('/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if(!user) return res.status(404).json({ error: 'User not found' });

  return res.json({ id: user.id, name: user.name, email: user.email });
});


// POST /receive -> Cadastrar receita ou despesa
app.post('/receive', authMiddleware, (req, res) => {
  const { description, value, type, date } = req.body;

  if(!description || !value || !type || !date){
    return res.status(400).json({ error: 'Missing fields' });
  }

  const item = {
    id: nextReceiveId++,
    userId: req.userId,
    description,
    value,
    type,        // 'receita' ou 'despesa'
    date,        // "31/08/2025"
    created_at: new Date(),
  };

  receives.push(item);

  return res.status(201).json(item);
});

// DELETE /receives/delete?item_id=123
app.delete('/receives/delete', authMiddleware, (req, res) => {
  const { item_id } = req.query;

  if(!item_id){
    return res.status(400).json({ error: 'item_id is required' });
  }

  const index = receives.findIndex(
    r => r.id === Number(item_id) && r.userId === req.userId
  );

  if(index === -1){
    return res.status(404).json({ error: 'Item not found' });
  }

  receives.splice(index, 1);

  return res.json({ message: 'Item removed successfully' });
});


// GET /receives?date=31/08/2025
app.get('/receives', authMiddleware, (req, res) => {
  const { date } = req.query;

  if(!date){
    return res.status(400).json({ error: 'date is required' });
  }

  const filtered = receives.filter(
    r => r.userId === req.userId && r.date === date
  );

  return res.json(filtered);
});

// GET /balance?date=31/10/2025  -> requer token
app.get('/balance', authMiddleware, (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "A data (date) é obrigatória na query." });
  }

  // filtra somente os registros do usuário autenticado e da data informada
  const userReceives = receives.filter(r => r.userId === req.userId && r.date === date);

  let entradas = 0;
  let saidas = 0;

  userReceives.forEach(item => {
    if (item.type === 'receita') {
      entradas += Number(item.value);
    } else if (item.type === 'despesa') {
      saidas += Number(item.value);
    }
  });

  const total = entradas - saidas;

  return res.json({
    total,
    entradas,
    saidas
  });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
  console.log('Note: this server stores users in memory (development only).');
});
