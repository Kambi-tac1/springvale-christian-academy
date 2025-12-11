# Pre-Deployment Checklist ✅

## Before You Host

- [ ] Update `.env`:
  - [ ] Set `NODE_ENV=production`
  - [ ] Change `ADMIN_PASSWORD` to something strong
  - [ ] Set `EMAIL_USER` to real Gmail address
  - [ ] Set `EMAIL_PASS` to Gmail App Password
  - [ ] Set `EMAIL_FROM` to your school email

- [ ] Test locally:
  - [ ] Run `npm install`
  - [ ] Run `npm start`
  - [ ] Open `http://localhost:3000` in browser
  - [ ] Fill and submit the form
  - [ ] Check that submission appears in `/admin.html` after login
  - [ ] Verify confirmation email is sent (check spam folder)

- [ ] Code quality:
  - [ ] No console errors in browser DevTools
  - [ ] No Node errors in terminal
  - [ ] All HTML/CSS renders correctly on mobile

- [ ] Security:
  - [ ] `.env` is NOT committed to Git
  - [ ] `.gitignore` includes `.env`, `node_modules/`, `database.sqlite`
  - [ ] Admin password is strong (not default)
  - [ ] Email credentials are real and valid

## Deployment Steps (Render Recommended)

1. [ ] Sign up at [render.com](https://render.com)
2. [ ] Push project to GitHub (or have ZIP ready)
3. [ ] Create new Web Service
4. [ ] Connect repository
5. [ ] Set Build Command: `npm install`
6. [ ] Set Start Command: `npm start`
7. [ ] Add environment variables:
   - [ ] `PORT` = `3000`
   - [ ] `NODE_ENV` = `production`
   - [ ] `EMAIL_SERVICE` = `gmail`
   - [ ] `EMAIL_USER` = your Gmail
   - [ ] `EMAIL_PASS` = your Gmail App Password
   - [ ] `EMAIL_FROM` = `Springvale Christian Academy <your-email@gmail.com>`
   - [ ] `ADMIN_USERNAME` = your chosen username
   - [ ] `ADMIN_PASSWORD` = strong password
   - [ ] `DB_PATH` = `database.sqlite`
8. [ ] Click Deploy
9. [ ] Wait for build to complete (usually 2-5 minutes)
10. [ ] Visit your live URL

## Post-Deployment Testing

- [ ] Open `https://your-app.onrender.com` in browser
- [ ] Form page loads correctly
- [ ] Submit test application
- [ ] Receive confirmation email
- [ ] Login to admin dashboard
- [ ] See your test application in the table
- [ ] Check server logs for any errors

## Going Live

- [ ] Announce to parents/students
- [ ] Update admissions info with new URL
- [ ] Monitor for issues first week
- [ ] Back up your database regularly
- [ ] Consider adding custom domain later

## File Checklist

Your project should contain these files:

```
✅ index.html              (frontend form)
✅ admin.html              (admin dashboard)
✅ server.js               (Express backend)
✅ package.json            (dependencies)
✅ .env                    (environment config - LOCAL ONLY)
✅ .env.example            (template)
✅ .gitignore              (prevents committing secrets)
✅ Procfile                (for Heroku/Render)
✅ logo.jpg                (school logo)
✅ favicon.ico             (browser icon)
✅ apple-touch-icon*.png   (mobile icons)
✅ SPRINGVALE...pdf        (enrollment form)
✅ node_modules/           (auto-installed)
✅ uploads/                (auto-created)
✅ database.sqlite         (auto-created on first submission)
```

## Troubleshooting

**App won't start?**
- Check that `npm install` completed successfully
- Look at deployment logs for error messages
- Verify all environment variables are set

**Form doesn't submit?**
- Check browser console for errors (F12)
- Verify backend URL is correct
- Check server logs on hosting platform

**Email not sending?**
- Gmail App Password is wrong
- Check Gmail security settings
- Verify 2FA is enabled and app password was generated correctly

**Admin login fails?**
- Credentials are Base64 encoded in browser
- Double-check username and password in `.env`
- Try logging out and back in

## Support Links

- **Render Docs:** https://render.com/docs
- **Node.js Hosting:** https://nodejs.org/en/docs/guides/nodejs-web-application/
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **Express.js Docs:** https://expressjs.com/

---

**You're all set! Good luck with your launch! 🎉**
