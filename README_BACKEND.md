# Backend — Springvale Christian Academy

Node.js + Express + SQLite backend with email confirmations, admin auth, and comprehensive validation.

## Quick Start

### 1. Install dependencies
```powershell
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and update values:
```powershell
cp .env.example .env
# Edit .env with your email credentials and admin password
```

### 3. Start the server
```powershell
npm start
```
Server listens on `http://localhost:3000` by default.

## Features

- **Form Validation** — Server-side email, phone, and text validation
- **File Uploads** — PDF/image uploads (max 10MB), stored in `uploads/`
- **Email Confirmations** — Auto-send confirmation emails (requires .env email config)
- **Admin Dashboard** — View all submissions at `http://localhost:3000/admin.html` (requires login)
- **Basic Auth** — Protected API endpoint for admins
- **Rate Limiting** — Max 5 submissions per 15 mins per IP
- **Logging** — HTTP request logging via Morgan
- **Error Handling** — Comprehensive error messages and validation feedback

## API Endpoints

### Health Check
```
GET /api/health
```
Response: `{ "status": "ok" }`

### Submit Application (public)
```
POST /api/applications
Content-Type: multipart/form-data

Fields:
  - name (required, min 2 chars)
  - email (required, valid email)
  - phone (required, valid phone)
  - class_level (optional)
  - notes (optional)
  - document (optional, PDF/JPG/PNG, max 10MB)
```
Response: `{ "id": 1, "message": "Application submitted successfully" }`

### View Applications (admin only)
```
GET /api/applications
Authorization: Basic <base64(username:password)>
```
Response: `{ "applications": [...] }`

## Admin Access

1. Go to `http://localhost:3000/admin.html`
2. Login with credentials from `.env` (defaults: `admin` / `changeme123`)
3. View, sort, and download submitted applications

## Environment Variables (.env)

```
PORT=3000
NODE_ENV=development

# Email (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=springvalechristianacademy@gmail.com

# Admin auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=changeme123

# Database
DB_PATH=database.sqlite
```

**Gmail Setup**: Use an [App Password](https://support.google.com/accounts/answer/185833) if 2FA is enabled.

## File Structure

```
├── server.js              # Express server + routes
├── package.json           # Dependencies
├── .env.example           # Environment template
├── .env                   # (Create from .env.example)
├── database.sqlite        # SQLite DB (auto-created)
├── admin.html             # Admin dashboard
├── index.html             # Frontend site + form
└── uploads/               # Uploaded files
```

## Development Tips

- Use `npm run dev` (after `npm install nodemon`) for hot-reload
- Check `database.sqlite` with any SQLite client to view raw data
- Logs appear in terminal; use Morgan for HTTP details
- Rate limiting can be adjusted in `server.js`

## Production Considerations

- Use a reverse proxy (Nginx) and HTTPS
- Store secrets in secure environment manager (not .env in Git)
- Increase upload file size limits if needed
- Add reCAPTCHA to prevent spam
- Use a real email service (SendGrid, AWS SES) instead of Gmail
- Deploy to Heroku, Render, or Railway
- Add database backups
- Monitor logs and errors

---
**Built with ❤️ for Springvale Christian Academy**
