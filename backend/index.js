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
let nextId = 1;

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
  console.log('Note: this server stores users in memory (development only).');
});
