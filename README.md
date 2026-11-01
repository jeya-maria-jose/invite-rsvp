# Invite — Jose & Chandni

A mobile-friendly, static GitHub Pages RSVP site for **Sunday, December 20, 2026, 10 AM–1 PM**, La Selva Beach, 138 Alta Drive, Santa Cruz.

Live site: https://jeya-maria-jose.github.io/invite-rsvp/

The page shows only the original invitation image followed by an ivory RSVP form with name and meal preference fields. Olive and gold accents and a soft coastal background match the invitation. The browser title remains **Invite**. Keyboard focus and mobile layouts are supported.

## Preview locally

From this folder, run `python3 -m http.server 8000 --bind 127.0.0.1`, then open `http://127.0.0.1:8000`. Stop the server with Ctrl+C when finished. No build step or package installation is needed.

## Publish the website

1. Use the GitHub repository `jeya-maria-jose/invite-rsvp`.
2. Upload the **contents** of this folder (including `index.html`, `style.css`, `script.js`, `config.js`, and `assets/`) to the repository root.
3. In GitHub, open **Settings → Pages** and choose **Deploy from a branch**, branch **main**, folder **/(root)**. Save.
4. Your page will be available at `https://jeya-maria-jose.github.io/invite-rsvp/` after publishing. The local folder can stay named `jose-chandni-rsvp`; it does not need to match the repository name.

## Set up RSVP storage (required before sharing the link)

GitHub Pages only serves static files. It **cannot write RSVPs into a CSV or into your GitHub repository**. This project uses a free Google Sheet + Google Apps Script web app instead.

1. Create a new Google Sheet in your account, e.g. `Jose Chandni RSVPs`.
2. In the Sheet, choose **Extensions → Apps Script**.
3. Replace the starter code with the contents of `google-apps-script.gs` and save.
4. Select **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Authorize the requested Google Sheets permissions and deploy.
5. Copy the Web app URL ending in `/exec` (not `/dev`).
6. Open `config.js` in the GitHub repository and paste it as `window.RSVP_ENDPOINT = 'https://script.google.com/macros/s/EXAMPLE/exec';`. Commit the change.
7. Open your live site and submit a test RSVP. Verify that a new row appears in the `RSVPs` tab of your Google Sheet. If it does not, inspect Apps Script **Executions**, deployment permissions and URL before sharing.
8. Share the GitHub Pages URL with friends. Download responses from Google Sheets with **File → Download → Comma Separated Values (.csv)** when needed.

**Important:** Because Apps Script returns a cross-origin response that browsers cannot read in this setup, the page reports that the RSVP request was sent, with a notice that guest-list delivery is not automatically confirmed. Test the actual Sheet carefully. A production-grade setup with confirmed writes would need a backend or a form service that supports CORS. With an empty endpoint, the form displays an explicit setup error and never shows success.

**Privacy:** The Google Sheet stays in your Google account. The web-app endpoint is public to permit guest RSVPs; anyone with the URL could submit entries, and the site has no identity verification or spam protection. Avoid putting private information in the form. The endpoint is intentionally not a secret.

## Files

- `index.html`, `style.css`, `script.js`: responsive RSVP website
- `config.js`: paste the deployed Apps Script URL
- `google-apps-script.gs`: server-side Sheet writer
- `assets/invitation.png`: sunny invitation design
- `assets/beach.png`: beach background detail
- `assets/design-reference.png`: side-by-side design reference
- `assets/favicon.svg`: Invite browser icon
