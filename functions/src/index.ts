/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Пример обработчика маршрута
app.get('/api/test', (req: any, res: any) => {
    // Ваш код для получения пользователей
    res.send('Hello from Firebase Function!');
});



// Экспортируйте ваше Express приложение в качестве функции
exports.app = functions.https.onRequest(app);
