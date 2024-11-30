const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the path module to resolve static file paths

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON request bodies

// Set up database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'gym_management',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API Endpoints

// Registration endpoint
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.query(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Email already exists' });
          } else {
            res.status(500).json({ message: 'Database error', error: err.message });
          }
          return;
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login endpoint
app.post('/api/users', (req, res) => {
  const { email, password } = req.body;

  // Fetch user from the database
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Database error', error: err.message });
        return;
      }

      if (results.length === 0) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

      const user = results[0];

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatch) {
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

      // Authentication successful
      res.status(200).json({ message: 'Login successful', userId: user.id, name: user.name });
    }
  );
});
// Get all coaches
app.get('/api/coaches', (req, res) => {
  db.query('SELECT * FROM coaches', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Add a new coach
app.post('/api/coaches', (req, res) => {
  const { name, specialty } = req.body;
  db.query('INSERT INTO coaches (name, specialty) VALUES (?, ?)', [name, specialty], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, name, specialty });
  });
});

// Subscribe to a plan
app.post('/api/subscribe', (req, res) => {
  const { plan, amount } = req.body;
  db.query('INSERT INTO transactions (plan, amount, date) VALUES (?, ?, NOW())', [plan, amount], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, plan, amount });
  });
});

// Catch-all route to serve the frontend index.html (for any unrecognized routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
