const { v4: uuidv4 } = require('uuid');
const NodeCache = require('node-cache');

const operationsCache = new NodeCache({ stdTTL: 86400 }); // 24 часа

class Helpers {
    static validatePhone(phone) {
        // Проверяем российский (+7) или белорусский (+375) номер
        const phoneRegex = /^(\+7|\+375)\d{9,12}$/;
        return phoneRegex.test(phone);
    }

    static formatPhone(phone, country) {
        if (country === 'ru') {
            // Форматирование для России
            return phone.replace('+7', '');
        } else if (country === 'by') {
            // Форматирование для Беларуси
            return phone.replace('+375', '');
        }
        return phone;
    }

    static generateOperationId() {
        return uuidv4();
    }

    static createOperation(phone, cycles, userAgents = [], proxies = []) {
        const operationId = this.generateOperationId();
        
        const operation = {
            id: operationId,
            phone: phone,
            cycles: parseInt(cycles),
            userAgents: userAgents,
            proxies: proxies,
            startedAt: new Date().toISOString(),
            status: 'running',
            currentCycle: 0,
            completedAPIs: 0,
            totalAPIs: 45,
            results: [],
            failedCount: 0,
            successCount: 0
        };
        
        operationsCache.set(operationId, operation);
        return operationId;
    }

    static getOperation(operationId) {
        return operationsCache.get(operationId);
    }

    static updateOperation(operationId, updates) {
        const operation = operationsCache.get(operationId);
        if (operation) {
            Object.assign(operation, updates);
            operationsCache.set(operationId, operation);
            return true;
        }
        return false;
    }

    static getCountryCode(phone) {
        if (phone.startsWith('+7')) return 'ru';
        if (phone.startsWith('+375')) return 'by';
        return null;
    }
}

module.exports = Helpers;
