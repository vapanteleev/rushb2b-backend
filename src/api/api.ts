

import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';;

import { Controllers } from '../controllers/controllers';
import User from '../models/User';


export interface IApiMethods {
    /**
     * Login api
     * 
     * @method
     * @name Login
     * @kind method
     * @memberof IApiMethods
     * @param {Request} req
     * @param {Response} res
     * @returns {any}
     */
    Login(req: Request, res: Response): any;


    /**
     * Register api
     * 
     * @method
     * @name Register
     * @kind method
     * @memberof IApiMethods
     * @returns {any}
     */
    Register(req: Request, res: Response): any;


    /**
     * Description
     * 
     * @method
     * @name GetActivities
     * @kind method
     * @memberof IApiMethods
     * @param {Request} req
     * @param {Response} res
     * @returns {any}
     */
    GetActivities(req: Request, res: Response): any;


    /**
     * Description
     * 
     * @method
     * @name GetUsers
     * @kind method
     * @memberof IApiMethods
     * @param {Request} req
     * @param {Response} res
     * @returns {any}
     */
    GetUsers(req: Request, res: Response): any;

    /**
     * Description
     * 
     * @method
     * @name GetSuplier
     * @kind method
     * @memberof IApiMethods
     * @param {Request} req
     * @param {Response} res
     * @returns {any}
     */
    GetSuplier(req: Request, res: Response): any;

}

let Api: IApiMethods = {
    async Login(req: Request, res: Response) {
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
                return res.status(400).json({ message: `неверный пароль (сообщение с бека): password:${password}, user.password: ${user?.password}` });
            }


            // res.json({ token, message: 'Вход выполнен успешно' });
            res.status(200).json({ data: { userId: user._id, role: user.role } });
            return true

        } catch (error: any) {
            res.status(500).json({ error: error.message });
            return true
        }
    },
    async Register(req: Request, res: Response) {
        const { username, email, password, role, activities, country, phoneNumber, productTypes } = req.body;

        try {
            // Хэшируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);

            // Создаём нового пользователя
            const newUser = new User({ username, email, password: hashedPassword, role, activities, country, phoneNumber, productTypes });
            await newUser.save();

            res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
            return true
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            return true
        }
    },
    async GetActivities(req: Request, res: Response) {
        try {
            // Пример использования функции получения активностей
            Controllers.GetActivities().then((activities: any) => {
                console.log('Activities:', activities);
                res.status(200).json({ activities: activities });
                return true
            });


        } catch (error: any) {
            res.status(500).json({ error: error.message });
            return true
        }
        return true

    },
    async GetUsers(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id).exec();
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
            return true
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
            return true
        }
    },
    async GetSuplier(req: Request, res: Response) {

        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
            return true
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
            return true
        }
    }
}
export { Api }

module.exports = { Api };
