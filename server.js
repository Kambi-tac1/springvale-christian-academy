require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many submissions from this IP, try again later.'
});

// Ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF and image files allowed'));
  }
});

// SQLite DB
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      class_level TEXT,
      notes TEXT,
      file_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Failed to ensure applications table exists:', err);
  });
});

// Email transporter (Gmail example)
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.verify((err, success) => {
    if (err) console.warn('Email transporter verification failed:', err.message || err);
    else console.log('Email transporter verified');
  });
} else {
  console.log('Email transporter not configured (EMAIL_USER/EMAIL_PASS missing)');
}

// Basic auth middleware
const basicAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Missing authorization' });
    const [scheme, credentials] = auth.split(' ');
    if (scheme !== 'Basic' || !credentials) return res.status(401).json({ error: 'Invalid auth scheme' });
    const decoded = Buffer.from(credentials, 'base64').toString();
    const sep = decoded.indexOf(':');
    if (sep === -1) return res.status(401).json({ error: 'Invalid authorization format' });
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (user === process.env.ADMIN_USERNAME && pass === process.env.ADMIN_PASSWORD) return next();
    return res.status(403).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Auth parse error:', err);
    return res.status(400).json({ error: 'Authorization parsing failed' });
  }
};

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Submit application
app.post('/api/applications', submitLimiter, upload.single('document'), [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  // Use a flexible phone check to avoid locale issues in validators
  body('phone').trim().isLength({ min: 7 }).withMessage('Invalid phone number')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, class_level, notes } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  const stmt = db.prepare(`INSERT INTO applications (name, email, phone, class_level, notes, file_path) VALUES (?,?,?,?,?,?)`);
  stmt.run(name, email, phone, class_level, notes, filePath, function (err) {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Failed to save application' });
    }

    // Send confirmation email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@springvale.edu',
        to: email,
        subject: 'Springvale Christian Academy — Application Received',
        html: `<p>Dear ${name},</p><p>Thank you for submitting your application to Springvale Christian Academy. We will review it shortly and contact you soon.</p><p>Best regards,<br>Admissions Team</p>`
      }, (err) => {
        if (err) console.error('Email error:', err);
      });
    }

    res.json({ id: this.lastID, message: 'Application submitted successfully' });
  });
  stmt.finalize();
});

// List applications (requires basic auth)
app.get('/api/applications', basicAuth, (req, res) => {
  db.all('SELECT id, name, email, phone, class_level, notes, file_path, created_at FROM applications ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Failed to fetch applications' });
    }
    res.json({ applications: rows || [] });
  });
});

// Serve uploads directory
app.use('/uploads', express.static(UPLOAD_DIR));

// Serve static files (HTML, CSS, JS, images) from project root
app.use(express.static(path.join(__dirname)));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n✓ Server listening on http://localhost:${PORT}`);
  console.log(`✓ Admin dashboard: http://localhost:${PORT}/admin.html\n`);
});

process.on('SIGINT', () => {
  console.log('\nShutting down...');
  db.close();
  process.exit(0);
});
