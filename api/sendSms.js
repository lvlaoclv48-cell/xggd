const Helpers = require('../../utils/helpers');
const SmsSender = require('../../lib/sender');

module.exports = async (req, res) => {
    // Проверяем метод
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { phone, cycles, userAgents, proxies } = req.body;

        // Валидация
        if (!phone || !cycles) {
            return res.status(400).json({ 
                error: 'Phone and cycles are required' 
            });
        }

        if (!Helpers.validatePhone(phone)) {
            return res.status(400).json({ 
                error: 'Invalid phone number format. Use +7 or +375' 
            });
        }

        if (isNaN(cycles) || cycles < 1 || cycles > 100) {
            return res.status(400).json({ 
                error: 'Cycles must be a number between 1 and 100' 
            });
        }

        // Создаем операцию
        const operationId = Helpers.createOperation(
            phone, 
            cycles, 
            userAgents || [], 
            proxies || []
        );

        // Запускаем отправку в фоновом режиме
        const sender = new SmsSender(phone, userAgents, proxies);
        sender.sendMultipleCycles(cycles, operationId)
            .catch(error => {
                console.error('SMS sending error:', error);
                Helpers.updateOperation(operationId, {
                    status: 'error',
                    error: error.message
                });
            });

        // Возвращаем ID операции
        res.status(200).json({
            success: true,
            message: 'SMS spam started',
            operationId: operationId,
            phone: phone,
            cycles: cycles,
            estimatedTime: `${cycles * 30} seconds`
        });

    } catch (error) {
        console.error('Error in sendSms:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};
