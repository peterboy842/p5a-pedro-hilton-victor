# Minimal backend for the finances app

This is a development-only backend that implements the minimal API the mobile app expects:

- POST `/users` { name, email, password } -> create user
- POST `/login` { email, password } -> returns `{ id, name, token }`
- GET `/me` -> protected endpoint; returns `{ id, name, email }`

How to run (PowerShell):

```powershell
cd backend
npm install
npm run start
```

Notes:
- Server listens on port `3333` by default. The frontend `app/services/api.js` expects `http://192.168.144.128:3333`.
- If you run backend locally and use an Android emulator, configure `app/services/api.js` to use `http://10.0.2.2:3333` or your machine's LAN IP.
- This backend stores users in memory and is not suitable for production.
