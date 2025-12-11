# GitHub & Render Setup — Step-by-Step

Your project is ready to deploy! Follow these steps:

## Step 1: Create GitHub Account (If you don't have one)

1. Go to [github.com/signup](https://github.com/signup)
2. Sign up with your email
3. Verify your email address
4. Skip personalization steps (optional)

## Step 2: Create a GitHub Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name: `Springvale Academy`
4. Select these scopes:
   - ✅ `repo` (full control of private repositories)
5. Click **Generate token**
6. **COPY the token immediately** (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 3: Push Your Project to GitHub

Open PowerShell and run these commands ONE BY ONE:

```powershell
cd "c:\Users\USER\Desktop\MY NEW PROJECT"

# Create a new repository on GitHub first at github.com/new
# Name it: springvale-academy
# Description: Website for Springvale Christian Academy
# Make it PUBLIC
# Click Create Repository

# Then run these commands:
git remote add origin https://github.com/YOUR_USERNAME/springvale-academy.git
git branch -M main
git push -u origin main
```

When prompted for password, **paste your GitHub token** (not your password).

## Step 4: Fix Render Configuration

Your `render.yaml` is already created. Now you just need to:

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (click "Continue with GitHub")
3. Authorize Render to access your GitHub account
4. Click **New +** → **Web Service**
5. Select your **springvale-academy** repository
6. Render will automatically detect `render.yaml` and use it
7. Fill in these settings:
   - **Name:** `springvale-academy`
   - **Environment:** Node (should auto-detect)
8. Click **Create Web Service**

## Step 5: Add Environment Variables in Render

After service is created:

1. Go to your service **Settings**
2. Scroll to **Environment Variables**
3. Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `EMAIL_SERVICE` | `gmail` |
| `EMAIL_USER` | `springvalechristianacademy2025@gmail.com` |
| `EMAIL_PASS` | *Get from Gmail App Passwords* |
| `EMAIL_FROM` | `Springvale Christian Academy <springvalechristianacademy2025@gmail.com>` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | *Create a strong password* |
| `DB_PATH` | `database.sqlite` |

## Step 6: Get Gmail App Password

1. Enable 2FA on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select **Mail** and **Windows Computer**
4. Google generates a 16-char password
5. Copy it → Paste in `EMAIL_PASS` in Render

## Step 7: Deploy!

Once you add environment variables:
- Render automatically starts building
- Wait 2-5 minutes
- Watch the logs in Render dashboard
- When it says "✓ Build succeeded", you're live!

Your app will be at: `https://springvale-academy.onrender.com`

## Step 8: Test It

1. Open `https://springvale-academy.onrender.com` in browser
2. Test the form submission
3. Check your email for confirmation
4. Go to `/admin.html` and login
5. Verify submission appears in dashboard

---

## Need Help?

- **GitHub token not working?** Make sure you copied the full token correctly
- **Build still failing?** Check Render logs for specific errors
- **Can't login to admin?** Verify ADMIN_USERNAME and ADMIN_PASSWORD match your .env

**Your project is production-ready! Follow these steps and it'll be live in 10 minutes.** 🚀
