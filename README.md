# THE HBM — Luxury Beauty Studio & Salon

An ultra-premium, high-performance website for **THE HBM Beauty Studio**, crafted with modern aesthetic design, vanilla JavaScript, fast WebP assets, and hardened security for PHP 8.2+ / Vercel Serverless.

---

## 🚀 How to Deploy on Vercel

Deploying this website to **Vercel** takes less than 2 minutes:

### Option A: Deploy via GitHub (Recommended)
1. Push this project repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: optimize for high performance and vercel deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/beautypalor.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. (Optional) In **Environment Variables**, configure your cloud MySQL database:
   - `DB_HOST`: Your cloud database host (e.g., PlanetScale, TiDB, Supabase, Aiven, Railway)
   - `DB_PORT`: `3306` (or your custom port)
   - `DB_NAME`: Database name
   - `DB_USER`: Database username
   - `DB_PASS`: Database password
   - `SITE_URL`: Your Vercel production URL (e.g. `https://thehbm.vercel.app`)
5. Click **"Deploy"**!

### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## ⚡ Performance Optimizations Implemented
- **WebP Modern Formats**: Converted and compressed all heavy assets (2.5MB+ PNGs reduced to ~50-150KB WebP images, a **90%+ payload reduction**).
- **Core Web Vitals & Zero CLS**: Added `loading="lazy"`, `decoding="async"`, and explicit aspect ratio dimensions across all gallery, service, and hero elements.
- **Throttled Scroll & 60fps Animations**: Replaced raw scroll listeners with native `IntersectionObserver` and `requestAnimationFrame`.
- **Audio Preload Fix**: Set `preload="none"` on background audio to prevent blocking page loads on mobile/desktop.
- **Edge Caching**: Configured `vercel.json` with 1-year immutable caching for `/assets/*`.

---

## 🔒 Security Hardening Implemented
- **OWASP Security Headers**: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`, `Referrer-Policy`, and `Permissions-Policy`.
- **Session Hardening**: Configured `HttpOnly`, `SameSite=Lax`, and dynamic `Secure` cookie attributes.
- **PHP 8.2+ Sanitization**: Removed deprecated `FILTER_SANITIZE_STRING` in favor of secure `htmlspecialchars()` and UTF-8 sanitization.
- **Bot Protection**: Implemented invisible Anti-Spam Honeypot field and CSRF token protection on the booking form.
- **Graceful DB Fallback**: Seamless Demo Mode fallback when database connection is unavailable.

---

## 💻 Local Development
To run locally using PHP's built-in server:
```bash
php -S localhost:8000
```
Open `http://localhost:8000` in your browser.
