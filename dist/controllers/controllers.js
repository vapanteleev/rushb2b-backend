import { ActivityModel } from '../models/Activities';
let Controllers = {
    async GetActivities() {
        try {
            const activities = await ActivityModel.find().lean();
            return activities;
        }
        catch (error) {
            console.error('Error fetching activities:', error);
            return [];
        }
    }
};
export { Controllers };
//# sourceMappingURL=controllers.js.map