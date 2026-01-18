const Helpers = require('../../utils/helpers');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { operationId } = req.body;

        if (!operationId) {
            return res.status(400).json({ 
                error: 'Operation ID is required' 
            });
        }

        const operation = Helpers.getOperation(operationId);

        if (!operation) {
            return res.status(404).json({ 
                error: 'Operation not found' 
            });
        }

        // Рассчитываем прогресс
        const progress = operation.currentCycle / operation.cycles * 100;
        const estimatedRemaining = (operation.cycles - operation.currentCycle) * 30; // 30 секунд на цикл

        res.status(200).json({
            success: true,
            operation: {
                id: operation.id,
                phone: operation.phone,
                status: operation.status,
                progress: `${progress.toFixed(1)}%`,
                cycles: {
                    current: operation.currentCycle,
                    total: operation.cycles,
                    remaining: operation.cycles - operation.currentCycle
                },
                statistics: {
                    totalRequests: operation.completedAPIs,
                    successful: operation.successCount || 0,
                    failed: operation.failedCount || 0,
                    successRate: operation.successCount / operation.completedAPIs * 100 || 0
                },
                timing: {
                    startedAt: operation.startedAt,
                    completedAt: operation.completedAt,
                    estimatedRemaining: `${estimatedRemaining} seconds`
                },
                configuration: {
                    userAgents: operation.userAgents.length,
                    proxies: operation.proxies.length
                }
            }
        });

    } catch (error) {
        console.error('Error in status:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
};
