const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');

const notUpToDate = async (req, res, next) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.history) {
            return res.status(404).json({ message: 'history not found in cache.' });
        }
        if (cacheData.history[0].upToDate) {
            cacheData.history[0].upToDate = false;
            fs.writeFileSync(cache, JSON.stringify(cacheData, null, 2), 'utf-8');
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    notUpToDate
};