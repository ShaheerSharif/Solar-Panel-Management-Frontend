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
- [Tailwind CSS](https://tailwindcss.com/)

## Firebase example config

- Create a `firebaseConfig.ts` file in project root.
- Create a firebase project [here](https://console.firebase.google.com).
- Initialize a web app.
- Build an email/password authentication database (without passwordless login).
- Build a realtime database.
- Initialize realtime database rules **(See rules below)**.
- Copy the initial config to your **Expo** project and make the necessary changes **(See the example config below)**.

**Example Config**

```ts
import { initializeApp } from "firebase/app"
import { initializeAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "YOUR_SECRET_API_KEY",
  authDomain: "your-web-app-name.firebaseapp.com",
  projectId: "your-web-app-name",
  storageBucket: "your-web-app-name.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app)
const db = getDatabase(app)

export { app, auth, db }
```

**rules.json** (Copy this to firebase rules)

```json
{
  "rules": {
    "devices": {
      ".indexOn": ["owner_uid"],
      "$deviceId": {
        // Restrict read/write to the device owner only
        ".read": "auth != null && data.child('owner_uid').val() === auth.uid",
        ".write": "auth != null && data.child('owner_uid').val() === auth.uid",

        // Optional: explicitly lock down ESP nodes (redundant but clearer)
        "esp_inverter": {
          "readings": {
            ".read": "auth != null && root.child('devices').child($deviceId).child('owner_uid').val() === auth.uid",
            ".write": "auth != null && root.child('devices').child($deviceId).child('owner_uid').val() === auth.uid"
          }
        },
        "esp_cleaner": {
          ".read": "auth != null && root.child('devices').child($deviceId).child('owner_uid').val() === auth.uid",
          ".write": "auth != null && root.child('devices').child($deviceId).child('owner_uid').val() === auth.uid"
        }
      }
    }
  }
}
```
