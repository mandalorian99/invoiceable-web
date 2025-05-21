## Deployment to GitHub Pages

1. **Install dependencies**
```bash
yarn install
```

2. **Deploy to GitHub Pages**
```bash
yarn deploy
```

This will:
- Build production assets (`dist` directory)
- Push them to the `gh-pages` branch
- Automatically publish via GitHub Pages

**Important Notes**:
- Repository must be named `invoiceable-web` (matches Vite's `base` config)
- For custom domains, update `base` in `vite.config.ts`
- Manual deployment: Build with `yarn build` and push `dist` contents to `gh-pages` branch

## License

This software is dual-licensed:
- **AGPL-3.0** for open source use
- **Commercial license** for production use

✅ Permitted:
- Modify and contribute code
- Use for personal/non-commercial projects
- Share modifications under AGPL

❌ Requires commercial license:
- Any commercial application
- SaaS/cloud deployments
- Redistribution in commercial products 