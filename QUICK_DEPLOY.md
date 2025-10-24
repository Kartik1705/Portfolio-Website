# ⚡ Quick Deploy Reference

## 🚀 5-Minute Netlify Deployment

### **Step 1: Go to Netlify**
👉 https://app.netlify.com/signup
- Sign up with GitHub (use Kartik1705 account)

### **Step 2: Import Project**
1. Click: **"Add new site"** → **"Import an existing project"**
2. Click: **"Deploy with GitHub"**
3. Select: **`Kartik1705/Portfolio-Website`**

### **Step 3: Configure Build**
```
Base directory:       Website
Build command:        (leave empty)
Publish directory:    Website
Production branch:    main
```

### **Step 4: Deploy!**
- Click **"Deploy site"**
- Wait 1-2 minutes
- ✅ Done!

---

## 🔄 Update Your Site After Deployment

```bash
# Make changes in VS Code → Save files

git add .
git commit -m "Your change description"
git push origin main

# ✅ Netlify auto-deploys in 1-2 minutes!
```

**That's it!** No manual redeployment needed. Push to GitHub = Auto deploy! 🎉

---

## 📋 Common Updates You'll Make

### **Update Email/Contact Info:**
```bash
# 1. Edit Website/index.html (line ~860)
# 2. Save
git add Website/index.html
git commit -m "Updated contact email"
git push origin main
# ✅ Live in 1-2 mins!
```

### **Add New Project:**
```bash
# 1. Edit Website/index.html (projects section)
# 2. Add project thumbnail to Website/assets/images/projects/
# 3. Save
git add .
git commit -m "Added new project"
git push origin main
# ✅ Live in 1-2 mins!
```

### **Update Resume:**
```bash
# 1. Replace Website/assets/CV/Kartik Pandya_Resume.pdf
# 2. Save
git add Website/assets/CV/
git commit -m "Updated resume"
git push origin main
# ✅ Live in 1-2 mins!
```

### **Fix Typo:**
```bash
# 1. Edit any file → Save
git add .
git commit -m "Fixed typo in about section"
git push origin main
# ✅ Live in 1-2 mins!
```

---

## 🎯 Post-Deployment TODOs

### **Must Do (5 minutes):**
- [ ] Test site on desktop
- [ ] Test site on mobile
- [ ] Update Google Analytics ID (replace `G-XXXXXXXXXX`)
- [ ] Update Tawk.to Chat ID (replace `YOUR_TAWK_ID`)

### **Should Do (10 minutes):**
- [ ] Set up EmailJS account → Add IDs
- [ ] Set up Mailchimp account → Add API key
- [ ] Customize Netlify URL: `kartikpandya.netlify.app`
- [ ] Share on LinkedIn/Twitter

### **Nice to Do (later):**
- [ ] Buy custom domain (~$10/year)
- [ ] Submit to Google Search Console
- [ ] Add to portfolio directories
- [ ] Set up deploy notifications

---

## 🔗 Quick Links

| Service | URL | Purpose |
|---------|-----|---------|
| **Netlify** | https://app.netlify.com | Deploy & host |
| **GitHub Repo** | https://github.com/Kartik1705/Portfolio-Website | Source code |
| **Google Analytics** | https://analytics.google.com | Get GA4 ID |
| **Tawk.to** | https://tawk.to | Get Chat ID |
| **EmailJS** | https://emailjs.com | Email service |
| **Mailchimp** | https://mailchimp.com | Newsletter |

---

## 💰 Cost: $0/month

Everything is FREE! 🎉
- Netlify hosting: FREE
- SSL certificate: FREE
- Auto deploys: FREE
- All integrations: FREE

Optional: Custom domain (~$10-15/year)

---

## 🆘 Help & Troubleshooting

### **Site not updating after push?**
1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)
2. Check Netlify dashboard → See deploy status
3. Clear browser cache

### **Images not loading?**
- Check file paths are relative: `assets/images/...` (not `/assets/...`)
- Ensure images exist in `Website/assets/images/`

### **Build failed?**
- Check deploy log in Netlify dashboard
- Usually a file path issue
- Fix locally → push again

### **Need help?**
- Netlify Docs: https://docs.netlify.com
- Check `NETLIFY_DEPLOYMENT.md` for detailed guide
- GitHub Issues: Create issue in your repo

---

## 📱 Your Live URL

After deployment, you'll get:
```
Default URL:  https://random-name-12345.netlify.app
Custom URL:   https://kartikpandya.netlify.app (after rename)
Own Domain:   https://kartikpandya.com (if you buy one)
```

---

## 🎉 You're Ready!

1. Deploy now: https://app.netlify.com
2. Push updates anytime with `git push`
3. Watch your site auto-deploy! ✨

**Good luck with your portfolio launch! 🚀**
