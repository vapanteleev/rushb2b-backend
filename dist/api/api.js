import * as bcrypt from 'bcrypt';
;
import { Controllers } from '../controllers/controllers';
import User from '../models/User';
let Api = {
    async Login(req, res) {
        const { email, password } = req.body;
        try {
            // Ищем пользователя по email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: `aaaaaa Пользователь не найден (сообщение с бека): password: ${password}, email: ${email}` });
            }
            // Проверяем пароль
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: `неверный пароль (сообщение с бека): password:${password}, user.password: ${user === null || user === void 0 ? void 0 : user.password}` });
            }
            // res.json({ token, message: 'Вход выполнен успешно' });
            res.status(200).json({ data: { userId: user._id, role: user.role } });
            return true;
        }
        catch (error) {
            res.status(500).json({ error: error.message });
            return true;
        }
    },
    async Register(req, res) {
        const { username, email, password, role, activities, country, phoneNumber, productTypes } = req.body;
        try {
            // Хэшируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);
            // Создаём нового пользователя
            const newUser = new User({ username, email, password: hashedPassword, role, activities, country, phoneNumber, productTypes });
            await newUser.save();
            res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
            return true;
        }
        catch (error) {
            res.status(500).json({ error: error.message });
            return true;
        }
    },
    async GetActivities(req, res) {
        try {
            // Пример использования функции получения активностей
            Controllers.GetActivities().then((activities) => {
                console.log('Activities:', activities);
                res.status(200).json({ activities: activities });
                return true;
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
            return true;
        }
        return true;
    },
    async GetUsers(req, res) {
        try {
            const user = await User.findById(req.params.id).exec();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
            return true;
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
            return true;
        }
    },
    async GetSuplier(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
            return true;
        }
        catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
            return true;
        }
    }
};
export { Api };
module.exports = { Api };
//# sourceMappingURL=api.js.map