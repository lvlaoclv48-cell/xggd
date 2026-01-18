// Простое хранилище для ботов (в реальном приложении используйте базу данных)
let botsDatabase = [];

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ 
                error: 'Bot username is required' 
            });
        }

        // Проверяем формат username
        const usernameRegex = /^[a-zA-Z0-9_]{5,32}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ 
                error: 'Invalid username format' 
            });
        }

        // Добавляем бота в базу
        const bot = {
            username: username.toLowerCase(),
            addedAt: new Date().toISOString(),
            active: true,
            usedCount: 0
        };

        // Проверяем, есть ли уже такой бот
        const existingIndex = botsDatabase.findIndex(b => b.username === bot.username);
        
        if (existingIndex !== -1) {
            // Обновляем существующего бота
            botsDatabase[existingIndex] = {
                ...botsDatabase[existingIndex],
                active: true,
                lastUpdated: new Date().toISOString()
            };
        } else {
            // Добавляем нового бота
            botsDatabase.push(bot);
        }

        // Ограничиваем размер базы
        if (botsDatabase.length > 1000) {
            botsDatabase = botsDatabase.slice(-500);
        }

        res.status(200).json({
            success: true,
            message: 'Bot added successfully',
            bot: {
                username: bot.username,
                addedAt: bot.addedAt
            },
            totalBots: botsDatabase.length
        });

    } catch (error) {
        console.error('Error in enterBot:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};
