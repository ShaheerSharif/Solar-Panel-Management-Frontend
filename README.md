# Solar Panel Power Management System Frontend

## Package Installation

- Navigate to project root
- Run:

```bash
npm i
```

- In case of Expo version errors

```bash
npx expo install --fix
```

## Run

- Install **Expo Go** app on mobile device
- Run:

```bash
npx expo start
```

- Scan QR Code on mobile device or enter URL
- Incase of bundler issues run

```bash
npx expo start -c
```

## Frameworks/Libraries Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [gluestack-ui](https://gluestack.io/)
- [Day.js](https://day.js.org/)
- [Firebase](https://firebase.google.com/)

## Firebase example config

- Create a `firebaseConfig.ts` file in project root.
- Create a firebase project [here](https://console.firebase.google.com).
- Initialize a web app
- Copy the initial config and make the necessary changes **(See the example config)**.

```ts
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "YOUR_SECRET_API_KEY",
  authDomain: "your-web-app-name.firebaseapp.com",
  projectId: "your-web-app-name",
  storageBucket: "your-web-app-name.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getDatabase(app);

export { app, auth, db };
```
