# Deploying LayaGo to GoDaddy

This repository is pre-configured and optimized for GoDaddy hosting (Shared cPanel / Linux Hosting / Dedicated Server).

---

## What Was Pre-Configured for GoDaddy:
1. **`.htaccess` Apache SPA Rewrites** (located in `public/.htaccess` and automatically copied into `dist/.htaccess`):
   - Prevents `404 Not Found` when users directly visit or reload routes like `/rooms`, `/amenities`, `/activities`, `/events`, etc.
   - Automatically redirects all requests to `index.html` so React Router handles them smoothly.
2. **Production Bundle**:
   - `npm run build` outputs optimized static files into `dist/`.

---

## Deployment Option 1: GoDaddy cPanel File Manager (Recommended & Quickest)

1. Build the production bundle on your computer (if making new changes):
   ```bash
   npm run build
   ```
2. Compress the contents of the `dist/` folder into a `.zip` archive:
   ```bash
   cd dist && zip -r ../dist.zip . && cd ..
   ```
3. Log into your **GoDaddy Account** -> **Web Hosting** -> **cPanel Admin**.
4. Open **File Manager** and navigate to your domain's document root (usually `public_html/` or a subfolder if an addon domain).
5. (Optional) Backup or clear any old files in that folder.
6. Click **Upload** and select `dist.zip`.
7. Once uploaded, right-click `dist.zip` and choose **Extract**.
8. Verify that `.htaccess` is present (ensure "Show Hidden Files" is turned on in cPanel File Manager settings).

---

## Deployment Option 2: GoDaddy FTP (FileZilla / Cyberduck)

1. Connect to your GoDaddy FTP using your cPanel FTP credentials.
2. Navigate to `public_html/`.
3. Upload all files and folders inside `dist/` (including `assets/`, `images/`, `audio/`, `textures/`, `index.html`, and `.htaccess`).

---

## Deployment Option 3: GoDaddy cPanel Git Version Control

1. In cPanel, navigate to **Git Version Control**.
2. Click **Create** and enter:
   - **Clone URL**: `https://github.com/cropintelligencebrain-hash/coorglaya.git`
   - **Repository Path**: `repositories/coorglaya`
3. If Node.js is installed in cPanel (via cPanel "Setup Node.js App"), you can run `npm install && npm run build` and symlink `dist` to `public_html`.
