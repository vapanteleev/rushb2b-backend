import mongoose, { Schema } from 'mongoose';
// Создаем схему для модели
const ActivitySchema = new Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});
// Создаем модель на основе схемы
const ActivityModel = mongoose.model('Activity', ActivitySchema);
// Экспортируем модель и функцию инициализации
export { ActivityModel };
//# sourceMappingURL=db.js.map