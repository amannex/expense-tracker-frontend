# Expense Tracker Frontend

React and TypeScript frontend for the Expense Tracker application.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` to the deployed backend URL, including its `/api` context path:

```text
VITE_API_URL=https://your-backend.example.com/api
```

## Deploy with Vercel

1. Create a new GitHub repository containing the contents of this directory.
2. Import that repository into Vercel.
3. Set the framework preset to **Vite** and add the `VITE_API_URL` environment variable.
4. Deploy. `vercel.json` keeps client-side routes working on refresh.

The frontend can also be deployed to any static host with `npm run build`; publish the generated `dist` directory and configure an SPA fallback to `index.html`.
