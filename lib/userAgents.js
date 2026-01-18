const UserAgent = require('user-agents');

class UserAgentsManager {
    static generate(count = 1) {
        const agents = [];
        for (let i = 0; i < count; i++) {
            const userAgent = new UserAgent();
            agents.push(userAgent.toString());
        }
        return agents;
    }

    static validate(userAgent) {
        // Простая проверка валидности User-Agent
        return userAgent && userAgent.length > 10 && 
               userAgent.includes('Mozilla') && 
               (userAgent.includes('Chrome') || userAgent.includes('Firefox') || userAgent.includes('Safari'));
    }

    static async checkUserAgent(userAgent) {
        try {
            // Проверяем User-Agent отправляя простой запрос
            const response = await axios.get('https://httpbin.org/user-agent', {
                headers: {
                    'User-Agent': userAgent
                },
                timeout: 5000
            });
            
            return {
                status: 'working',
                userAgent: userAgent,
                response: response.data['user-agent'] === userAgent
            };
        } catch (error) {
            return {
                status: 'failed',
                userAgent: userAgent,
                message: error.message
            };
        }
    }

    static async checkMultipleAgents(agents) {
        const results = [];
        for (const agent of agents) {
            const result = await this.checkUserAgent(agent);
            results.push(result);
        }
        return results;
    }
}

module.exports = UserAgentsManager;
