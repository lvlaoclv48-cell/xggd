const axios = require('axios');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');

class ProxyChecker {
    static parseProxy(proxyString) {
        const regex = /^(?:(\w+):\/\/)?([^:@]+)(?::([^@]+))?@([^:]+):(\d+)$/;
        const match = proxyString.match(regex);
        
        if (!match) return null;
        
        const [, protocol, username, password, host, port] = match;
        return {
            protocol: protocol || 'socks5',
            host,
            port: parseInt(port),
            username,
            password
        };
    }

    static createAgent(proxyString) {
        try {
            const proxy = this.parseProxy(proxyString);
            if (!proxy) return null;

            let agent;
            const proxyUrl = `${proxy.protocol}://${proxy.username ? `${proxy.username}:${proxy.password}@` : ''}${proxy.host}:${proxy.port}`;

            if (proxy.protocol.includes('socks')) {
                agent = new SocksProxyAgent(proxyUrl);
            } else {
                agent = new HttpsProxyAgent(proxyUrl);
            }

            return agent;
        } catch (error) {
            console.error('Error creating proxy agent:', error);
            return null;
        }
    }

    static async checkProxy(proxyString) {
        try {
            const agent = this.createAgent(proxyString);
            if (!agent) return { status: 'error', message: 'Invalid proxy format' };

            const response = await axios.get('https://httpbin.org/ip', {
                httpAgent: agent,
                httpsAgent: agent,
                timeout: 10000
            });

            return {
                status: 'working',
                ip: response.data.origin,
                proxy: proxyString
            };
        } catch (error) {
            return {
                status: 'failed',
                message: error.message,
                proxy: proxyString
            };
        }
    }

    static async checkMultipleProxies(proxies) {
        const results = [];
        for (const proxy of proxies) {
            const result = await this.checkProxy(proxy);
            results.push(result);
        }
        return results;
    }
}

module.exports = ProxyChecker;
