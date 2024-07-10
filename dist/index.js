// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 4000;
const mongoURI = 'mongodb://localhost:27017';
const JWT_SECRET = 'your_jwt_secret_key'; // Секретный ключ для JWT
// Подключение к MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
// Определение схемы и модели пользователя
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['supplier', 'buyer'], required: true },
});
const User = mongoose.model('User', userSchema);
// Middleware для парсинга JSON
app.use(express.json());
// Middleware для CORS
app.use(cors());
// Роут для входа пользователя
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Ищем пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }
        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }
        // Генерируем JWT токен
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Вход выполнен успешно' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Роут для регистрации пользователя
app.post('/api/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        // Создаём нового пользователя
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
