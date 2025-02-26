// src/index.ts

import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { Controllers } from 'controllers/controllers';
import { Api } from './api/api';
import User from 'models/User';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const mongoURI = 'mongodb://127.0.0.1:27017/rush-b2b-main';
const JWT_SECRET = 'your_jwt_secret_key'; // Секретный ключ для JWT
// Middleware для CORS

// Подключение к MongoDB
mongoose.connect(mongoURI, {

} as ConnectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


// Middleware для парсинга JSON
app.use(express.json());


// Роут для входа пользователя
app.post('/api/login', Api.Login);
// Роут для регистрации пользователя
app.post('/api/register', Api.Register);

//получить список активностей
app.get('/api/activities', Api.GetActivities);

//получить юзера по айди
app.get('/api/users/:id', Api.GetUsers);

//получить поставщика по айди
app.get('/api/supplier/:id', Api.GetSuplier);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
