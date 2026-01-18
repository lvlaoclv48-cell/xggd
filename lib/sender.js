const axios = require('axios');
const APIs = require('./apis');
const ProxyChecker = require('./proxyChecker');
const Helpers = require('../utils/helpers');

class SmsSender {
    constructor(phone, userAgents = [], proxies = []) {
        this.phone = phone;
        this.userAgents = userAgents.length > 0 ? userAgents : [null];
        this.proxies = proxies.length > 0 ? proxies : [null];
        this.country = Helpers.getCountryCode(phone);
        this.results = [];
    }

    async sendToAPI(api) {
        let success = false;
        let error = null;
        
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                const userAgent = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
                const proxy = this.proxies[Math.floor(Math.random() * this.proxies.length)];
                
                let config = {
                    method: api.method,
                    url: api.url,
                    headers: { ...api.headers },
                    timeout: 10000
                };

                // Добавляем User-Agent если есть
                if (userAgent) {
                    config.headers['User-Agent'] = userAgent;
                }

                // Добавляем прокси если есть
                if (proxy) {
                    const agent = ProxyChecker.createAgent(proxy);
                    if (agent) {
                        config.httpAgent = agent;
                        config.httpsAgent = agent;
                    }
                }

                // Формируем тело запроса
                if (api.method === 'GET') {
                    config.url += api.bodyT(this.phone);
                } else {
                    config.data = api.bodyT(this.phone);
                    // Для некоторых API нужен CSRF токен
                    if (api.name === 'naomisushi-register') {
                        // Здесь можно добавить логику получения CSRF
                        config.data = api.bodyT(this.phone, '');
                    }
                }

                const response = await axios(config);
                
                success = true;
                error = null;
                break;
                
            } catch (err) {
                error = err.message;
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            }
        }

        return {
            api: api.name,
            success: success,
            error: error,
            timestamp: new Date().toISOString()
        };
    }

    async sendSingleCycle() {
        const cycleResults = [];
        
        // Выбираем 45 случайных API
        const selectedAPIs = [];
        const apiCount = Math.min(45, APIs.length);
        
        for (let i = 0; i < apiCount; i++) {
            let randomAPI;
            do {
                randomAPI = APIs[Math.floor(Math.random() * APIs.length)];
            } while (selectedAPIs.includes(randomAPI));
            selectedAPIs.push(randomAPI);
        }

        // Отправляем запросы
        for (const api of selectedAPIs) {
            const result = await this.sendToAPI(api);
            cycleResults.push(result);
            
            // Небольшая задержка между запросами
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return cycleResults;
    }

    async sendMultipleCycles(cycles, operationId) {
        const allResults = [];
        
        for (let cycle = 0; cycle < cycles; cycle++) {
            // Обновляем статус операции
            Helpers.updateOperation(operationId, {
                currentCycle: cycle + 1,
                status: 'running'
            });

            console.log(`Cycle ${cycle + 1}/${cycles} for operation ${operationId}`);
            
            const cycleResults = await this.sendSingleCycle();
            allResults.push(...cycleResults);

            // Обновляем статистику
            const successCount = cycleResults.filter(r => r.success).length;
            const failedCount = cycleResults.filter(r => !r.success).length;
            
            Helpers.updateOperation(operationId, {
                completedAPIs: (cycle + 1) * 45,
                successCount: (Helpers.getOperation(operationId).successCount || 0) + successCount,
                failedCount: (Helpers.getOperation(operationId).failedCount || 0) + failedCount,
                results: [...(Helpers.getOperation(operationId).results || []), ...cycleResults]
            });

            // Задержка между циклами
            if (cycle < cycles - 1) {
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }

        // Завершаем операцию
        Helpers.updateOperation(operationId, {
            status: 'completed',
            completedAt: new Date().toISOString()
        });

        return allResults;
    }
}

module.exports = SmsSender;
