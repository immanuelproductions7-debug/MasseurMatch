# MasseurMatch — Static site

This repository contains a small static "coming soon" site with a chat widget.

Deployment
- GitHub Actions is configured to publish the repository root to the `gh-pages` branch on every push to `main`.
- The workflow file is at `.github/workflows/deploy.yml` and uses `peaceiris/actions-gh-pages`.

To deploy locally or test:

```bash
# serve the site locally from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

Enable Firestore lead saving (optional)
1. Open `script.js` and replace the placeholders in the `firebaseConfig` object with your Firebase project's values.
2. Commit and push — the site will automatically be redeployed via GitHub Actions.

Notes
- The workflow publishes the whole repository root. If you prefer to publish a built folder (for example `dist/`), update `publish_dir` in `.github/workflows/deploy.yml` and add a build step that produces that folder.
- Make sure GitHub Pages is enabled in your repository settings if you want a custom domain or to change source settings.
