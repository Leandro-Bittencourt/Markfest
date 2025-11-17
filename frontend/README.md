MarkFest Frontend (React + Vite)

This folder contains a simple but complete React frontend for the MarkFest demo services. It provides authentication (login/register) and a management UI for registrations (create, list, delete).

Quick start
1. Install Node.js (recommended v18+) and npm.
2. From this folder run:

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000` by default. The app expects backend services to be available behind an API base path. Configure the base path using the input at the top-right of the app or create a `.env` file:

```
VITE_API_BASE=/
# or directly
# VITE_API_BASE=http://localhost:8083
```

Notes
- If `VITE_API_BASE` is `/` you should run the API Gateway (or reverse proxy) so routes like `/participation-service/registrations` and `/auth-service/auth/login` work.
- If you run services directly, set `VITE_API_BASE` to a full URL (for example `http://localhost:8083`) and the frontend will call `http://localhost:8083/participation-service/...`.

Building for production

```bash
npm run build
npm run preview
```

Optional: Docker
- You can build the Vite app and serve it with an Nginx container in production. If you want that, I can add a `Dockerfile` and `nginx.conf`.
