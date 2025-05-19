# KirjaSwappi Web-UI

[![Release Pipeline](https://github.com/kirjaswappi/kirjaswappi-frontend/actions/workflows/release.yml/badge.svg)](https://github.com/kirjaswappi/kirjaswappi-frontend/actions/workflows/release.yml) [![Publish Package](https://github.com/kirjaswappi/kirjaswappi-frontend/actions/workflows/publish.yml/badge.svg)](https://github.com/kirjaswappi/kirjaswappi-frontend/actions/workflows/publish.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/01648706-95ce-47a4-965e-364ea53b5317/deploy-status)](https://app.netlify.com/sites/kirjaswappi/deploys)

## Installation:
```sh
cd kirjaswappi-frontend
yarn install
npm run dev
```

To format the source code, you can run:
```console
npm run spotless
```

## Project Sturcture:
```
my-react-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── ...
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

**Canary UI**: https://canary.kirjaswappi.fi

**Backeknd API Url**: https://api.kirjaswappi.fi

**API Documentation**: [Open API Documentation](https://api.kirjaswappi.fi/swagger-ui/index.html)
