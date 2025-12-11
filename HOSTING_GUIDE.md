# Hosting Guide — Springvale Christian Academy

Your application is ready to host! Choose one of these platforms:

## Option 1: **Render** (Recommended - FREE tier available)

### Steps:
1. Sign up at [render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repo (or upload ZIP)
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Copy from `.env`
5. Deploy!

**Pros:** Free tier, auto-scaling, easy HTTPS, minimal config  
**Time to deploy:** ~5 minutes

---

## Option 2: **Railway** (Simple, pay-as-you-go)

### Steps:
1. Sign up at [railway.app](https://railway.app)
2. Create a new project
3. Add Node.js service
4. Connect GitHub repo
5. Add environment variables from `.env`
6. Deploy!

**Pros:** Simple UI, HTTPS included, $5/month free credits  
**Time to deploy:** ~5 minutes

---

## Option 3: **Heroku** (Popular, straightforward)

### Steps:
1. Sign up at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run:
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```
4. Set environment variables:
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set ADMIN_PASSWORD=strong-password
   ```

**Pros:** Mature platform, great docs, GitHub integration  
**Cost:** $7/month (Eco Dyno)

---

## Option 4: **Vercel** (NextJS/Node support)

1. Sign up at [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set environment variables
4. Deploy!

**Note:** Vercel is better for serverless (frontend), but can host Node backends with limitations.

---

## Step-by-Step for Any Platform

### Before Deploying:

1. **Update `.env` with real credentials:**
   ```
   EMAIL_USER=springvalechristianacademy2025@gmail.com
   EMAIL_PASS=<Gmail App Password>
   ADMIN_PASSWORD=<Strong password>
   NODE_ENV=production
   ```

2. **Push to GitHub** (recommended):
   ```bash
   git init
   git add .
   git commit -m "Ready for production"
   git push -u origin main
   ```

3. **Test locally first:**
   ```bash
   npm install
   npm start
   # Visit http://localhost:3000
   ```

### During Deployment:

- Set all environment variables in the hosting platform's dashboard
- Make sure `.env` is in `.gitignore` (it already is) — **NEVER commit secrets to Git**
- Enable HTTPS (all platforms offer this by default)

### After Deployment:

- Test the form submission on the live URL
- Verify email confirmations arrive
- Login to `/admin.html` and check the dashboard
- Monitor server logs for errors

---

## Important Security Notes

⚠️ **Before Going Live:**

1. **Change the admin password** in `.env`
2. **Get a Gmail App Password:**
   - Enable 2FA on Gmail
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Generate one, paste it in `EMAIL_PASS`
3. **Use strong passwords** — not the defaults
4. **Enable HTTPS** — all platforms offer this automatically
5. **Consider adding reCAPTCHA** to the form to prevent spam (optional upgrade)
6. **Back up your database** — SQLite files can be lost; use platform backups

---

## Quick Comparison Table

| Platform | Cost | Setup Time | HTTPS | Scaling | Best For |
|----------|------|-----------|-------|---------|----------|
| **Render** | Free tier | 5 min | ✅ | Auto | Best choice |
| **Railway** | $5/mo | 5 min | ✅ | Auto | Good alternative |
| **Heroku** | $7/mo | 5 min | ✅ | Manual | Mature, reliable |
| **Vercel** | Free | 5 min | ✅ | Auto | Frontend-focused |

---

## Recommended: Render

For your use case, **Render.com** is ideal because:
- Free tier covers small schools
- Auto-deploys on Git push
- Handles HTTPS automatically
- No credit card needed for free tier
- Perfect for Node.js + SQLite apps

### Deploy to Render in 5 Steps:

1. Go to [render.com](https://render.com) → Sign up
2. Click **New +** → **Web Service**
3. Connect GitHub (or upload ZIP of your project)
4. Set **Start Command:** `npm start`
5. Add environment variables (copy-paste from your `.env`)
6. Click **Deploy** ✅

Your app will be live at `https://your-app-name.onrender.com`

---

## Troubleshooting

**"Cannot find module X"**
- Your hosting platform should auto-run `npm install`
- If not, add it to build commands

**"Email not sending"**
- Gmail App Password is incorrect
- Check spam folder
- Verify email credentials in `.env`

**"Admin login doesn't work"**
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` match your `.env`
- Base64 encoding is automatic in browser

**"Database errors"**
- SQLite file might be read-only
- Some platforms reset file storage on restart
- Consider migrating to PostgreSQL for production

---

## Next Steps (Optional Upgrades)

1. **Use PostgreSQL instead of SQLite** — better for production
2. **Add email templates** — prettier confirmation emails
3. **Add reCAPTCHA** — prevent spam submissions
4. **Add SMS notifications** — alert admins of new applications
5. **Add analytics** — track page views and conversions
6. **Add backup system** — automatic database backups
7. **Add custom domain** — `springvalechristianacademy.com`

---

**Ready to launch? Choose Render and deploy now!** 🚀
