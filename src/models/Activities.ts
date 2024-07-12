import mongoose, {  Document } from 'mongoose';


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

// Создаем модель на основе схемы
const ActivityModel = mongoose.model<Activity>('Activity', ActivitySchema);


// Экспортируем модель и функцию инициализации
export { ActivityModel };
