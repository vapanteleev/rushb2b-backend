import { ActivityModel } from '../models/Activities';
import { IControllers } from './IControllers';



let Controllers: IControllers = {
    async GetActivities() {
        try {
            const activities = await ActivityModel.find().lean();
            return activities;
        } catch (error) {
            console.error('Error fetching activities:', error);
            return [];
        }
    }
}
export { Controllers }


