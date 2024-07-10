// src/index.ts

import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { Controllers } from 'controllers/controllers';

const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = 'mongodb://localhost:27017/rush-b2b-main';
const JWT_SECRET = 'your_jwt_secret_key'; // Секретный ключ для JWT

// Подключение к MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Интерфейс для модели рода деятельности
interface Activity extends Document {
    code: string;
    name: string;
}

// Создаем схему для модели
const ActivitySchema = new mongoose.Schema<Activity>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

// Определение схемы и модели пользователя
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['supplier', 'buyer'], required: true },
    activities: { type: [ActivitySchema], required: true },

});


const User = mongoose.model('User', userSchema);

// Middleware для парсинга JSON
app.use(express.json());
// Middleware для CORS
app.use(cors());
// Роут для входа пользователя
app.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Ищем пользователя по email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: `Пользователь не найден (сообщение с бека): password: ${password}, email: ${email}` });
        }



        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: `неверный пароль (сообщение с бека): password:${password}, user.password: ${user?.password}` });
        }

        // Генерируем JWT токен
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // res.json({ token, message: 'Вход выполнен успешно' });
        res.status(200).json({ userId: user._id });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
// Роут для регистрации пользователя
app.post('/api/register', async (req: Request, res: Response) => {
    const { username, email, password, role, activities } = req.body;

    try {
        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём нового пользователя
        const newUser = new User({ username, email, password: hashedPassword, role, activities });
        await newUser.save();

        res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/activities', async (req: Request, res: Response) => {
    try {
        // Пример использования функции получения активностей
        Controllers.GetActivities().then((activities: any) => {
            console.log('Activities:', activities);
            res.status(200).json({ activities: activities });

        });


    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }

});
app.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
