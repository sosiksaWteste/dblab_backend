const path = require('path');
const fs = require('fs');
const cache = path.join(__dirname, '..', 'cache.json');
const DevelopmentDirection = require('../models/Relations').DevelopmentDirection;

const create = async (req, res) => {
    try {
        const { development_direction_name, development_direction_Description } = req.body;
        const developmentDirection = await DevelopmentDirection.create({ development_direction_name, development_direction_Description });
        return res.status(201).json(developmentDirection);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        if (!cacheData.developmentDirections) {
            return res.status(404).json({ message: 'developmentDirection not found in cache.' });
        }
        return res.status(200).json(cacheData.developmentDirections);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleter = async (req, res) => {
    try {
        const { development_direction_Id } = req.params;
        const result = await DevelopmentDirection.destroy({ where: { development_direction_Id } });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { development_direction_Id } = req.params;
        const { development_direction_name, development_direction_Description } = req.body;
        const developmentDirection = await DevelopmentDirection.update({ development_direction_name, development_direction_Description }, {where: {development_direction_Id}});
        return res.status(200).json(developmentDirection);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRoad = async (req, res) => {
    try {
        const { development_direction_Id } = req.params;
        const cacheData = JSON.parse(fs.readFileSync(cache, 'utf-8'));
        const {
            developmentDirections,
            levels,
            chapters,
            skillChapters,
            skills
        } = cacheData;
        const direction = developmentDirections.find(d => d.development_direction_Id == development_direction_Id);
        if (!direction) {
            return res.status(404).json({ message: 'Discipline not found' });
        }
        const filteredChapters = chapters.filter(ch => ch.development_direction_Id == development_direction_Id);
        const relatedLevels = levels.map(level => {
            const relatedChapters = filteredChapters
                .filter(ch => ch.level_Id == level.level_Id)
                .map(ch => {
                    const relatedSkillIds = skillChapters
                        .filter(sc => sc.chapter_Id == ch.chapter_Id)
                        .map(sc => sc.skill_Id);
                    const relatedSkills = skills
                        .filter(s => relatedSkillIds.includes(s.skill_Id))
                        .map(s => ({ name: s.skill_name }));
                    return {
                        name: ch.chapter_name,
                        skills: relatedSkills
                    };
                });
            return {
                name: level.level_name,
                sections: relatedChapters
            };
        });
        const roadmap = {
            direction,
            levels: relatedLevels.filter(level => level.sections.length > 0)
        };
      
        return res.status(200).json(roadmap);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    create,
    getAll,
    deleter,
    update,
    getRoad
};