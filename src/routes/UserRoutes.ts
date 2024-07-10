import express, { Request, Response } from 'express';
import User, { UserDocument } from '../models/User';

const router = express.Router();

// Регистрация нового пользователя
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
});

export default router;
