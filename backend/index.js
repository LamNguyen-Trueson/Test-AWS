const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'zindahai.c7eg44gw2k89.eu-west-3.rds.amazonaws.com',
  database: 'postgres',
  password: 'Trueson123!',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
}
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
      return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

app.get('/presentations', async (req, res) => {
  const result = await pool.query('SELECT * FROM zdh_presentation');
  res.json(result.rows);
});

app.get('/slides/:presentationId', async (req, res) => {
  const { presentationId } = req.params;
  const result = await pool.query('SELECT * FROM zdh_slide WHERE zdh_presentation = $1', [presentationId]);
  res.json(result.rows);
});

app.get('/slide-files/:slideId', async (req, res) => {
  const { slideId } = req.params;
  const result = await pool.query('SELECT * FROM zdh_slide_file WHERE zdh_slide = $1', [slideId]);
  res.json(result.rows);
});

app.listen(3000, () => console.log('API running on port 3000'));