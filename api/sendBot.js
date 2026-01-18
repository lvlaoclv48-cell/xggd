// Используем ту же базу данных ботов
let botsDatabase = [];

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Получаем случайного активного бота
        const activeBots = botsDatabase.filter(bot => bot.active);
        
        if (activeBots.length === 0) {
            return res.status(404).json({ 
                error: 'No bots available in database' 
            });
        }

        // Выбираем случайного бота
        const randomBot = activeBots[Math.floor(Math.random() * activeBots.length)];
        
        // Обновляем счетчик использования
        const botIndex = botsDatabase.findIndex(b => b.username === randomBot.username);
        if (botIndex !== -1) {
            botsDatabase[botIndex].usedCount += 1;
            botsDatabase[botIndex].lastUsed = new Date().toISOString();
        }

        res.status(200).json({
            success: true,
            bot: {
                username: randomBot.username,
                addedAt: randomBot.addedAt,
                usedCount: randomBot.usedCount + 1
            },
            totalBots: botsDatabase.length,
            activeBots: activeBots.length
        });

    } catch (error) {
        console.error('Error in sendBot:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};
