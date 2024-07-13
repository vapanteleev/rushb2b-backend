import { ActivityModel } from '../models/Activities';
import { IControllers } from './IControllers';



let Controllers: IControllers = {
    async GetActivities() {
        try {
            const activities = await ActivityModel.find().lean();
            return activities?.length > 0 ? activities : ['hui,pizda'];
        } catch (error) {
            console.error('Error fetching activities:', error);
            return ['hui,pizda'];
        }
    }
}
export { Controllers }


