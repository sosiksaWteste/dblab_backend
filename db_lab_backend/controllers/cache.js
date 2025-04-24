const path = require('path');
const fs = require('fs');
const {Chapter, DevelopmentDirection, Discipline, DisciplineSkill, 
    DisciplineTeacher, Event, Language, Lesson, Level, 
    Material, Skill, SkillChapter, Teacher} = require(path.join(__dirname, '..', 'models', 'Relations'));

const update = async (req, res) => {
    try {
        const chapters = await Chapter.findAll();
        const developmentDirections = await DevelopmentDirection.findAll();
        const disciplines = await Discipline.findAll();
        const disciplineSkills = await DisciplineSkill.findAll();
        const disciplineTeachers = await DisciplineTeacher.findAll();
        const events = await Event.findAll();
        const languages = await Language.findAll();
        const lessons = await Lesson.findAll();
        const levels = await Level.findAll();
        const materials = await Material.findAll();
        const skills = await Skill.findAll();
        const skillChapters = await SkillChapter.findAll();
        const teachers = await Teacher.findAll();
      
        const combinedData = {
            chapters: chapters.map(chapters => chapters.toJSON()),
            developmentDirections: developmentDirections.map(developmentDirections => developmentDirections.toJSON()),
            disciplines: disciplines.map(disciplines => disciplines.toJSON()),
            disciplineSkills: disciplineSkills.map(disciplineSkills => disciplineSkills.toJSON()),
            disciplineTeachers: disciplineTeachers.map(disciplineTeachers => disciplineTeachers.toJSON()),
            events: events.map(events => events.toJSON()),
            languages: languages.map(languages => languages.toJSON()),
            lessons: lessons.map(lessons => lessons.toJSON()),
            levels: levels.map(levels => levels.toJSON()),
            materials: materials.map(materials => materials.toJSON()),
            skills: skills.map(skills => skills.toJSON()),
            skillChapters: skillChapters.map(skillChapters => skillChapters.toJSON()),
            teachers: teachers.map(teachers => teachers.toJSON()),
        };
        const jsonData = JSON.stringify(combinedData, null, 2);
        fs.writeFileSync(path.join(__dirname, '..', 'cache.json'), jsonData, 'utf-8');
        return res.status(200).json({ message: "success"})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    update
};