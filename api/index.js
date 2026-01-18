const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Корневой маршрут
app.get('/', (req, res) => {
  res.json({
    message: 'SMS Spam API',
    version: '1.0.0',
    endpoints: [
      '/api/sendSms - POST: Запуск отправки SMS',
      '/api/check - POST: Проверка прокси и User-Agent',
      '/api/status - POST: Статус операции',
      '/api/enterBot - POST: Добавить бота',
      '/api/sendBot - GET: Получить случайного бота'
    ],
    documentation: 'https://github.com/lvlaoclv48-cell/xggd'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Экспортируем для Vercel
module.exports = app;
