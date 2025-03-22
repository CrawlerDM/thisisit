import express from 'express';
import { Pool } from 'pg';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the "submissions" table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    gsm TEXT NOT NULL,
    selected_days JSON NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW()
  )
`;

pool.query(createTableQuery)
  .then(() => console.log('Table "submissions" ensured.'))
  .catch((err) => console.error('Error creating table:', err));

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// Nodemailer transporter configuration (using Mailgun SMTP as an example)
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587, // Change to 465 if using SSL
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.MAILGUN_USER, // Your Mailgun SMTP username
    pass: process.env.MAILGUN_PASS, // Your Mailgun SMTP password
  },
});

// Example GET route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

// Existing route to check the name and set a cookie
app.post('/submit-name', (req, res) => {
  let { name } = req.body;

  // Clean the name: trim, remove diacritics, to lowercase, collapse spaces
  const cleanedName = name
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ');

  if (cleanedName === 'zoe vandekerckhove') {
    res.cookie('dingdongcookie', 'true', { httpOnly: false });
    return res.json({ success: true });
  } else {
    res.cookie('dingdongcookie', 'false', { httpOnly: false });
    return res.json({ success: false });
  }
});

// New endpoint to store form data and send an email
app.post('/submit-form', async (req, res) => {
  const { gsm, selectedDays } = req.body;

  if (!gsm || !selectedDays) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Insert the data into the "submissions" table
    const insertQuery = `
      INSERT INTO submissions(gsm, selected_days, submitted_at)
      VALUES($1, $2, NOW())
      RETURNING id
    `;
    const result = await pool.query(insertQuery, [gsm, JSON.stringify(selectedDays)]);
    const submissionId = result.rows[0].id;

    // Prepare the email content.
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email (Mailgun SMTP user)
      to: 'lowievanhooreweder@hotmail.com',
      subject: 'Nieuwe Formulier Inzending',
      text: `Er is een nieuwe inzending binnengekomen:
Gsm: ${gsm}
Geselecteerde dagen: ${JSON.stringify(selectedDays, null, 2)}
Inzending ID: ${submissionId}
`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, submissionId });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
