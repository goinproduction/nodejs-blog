const Course = require('../models/Course');
const { multiMongooseToObject } = require('../../utils/mongoose.js');
class MeController {
    //[GET] /stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: multiMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    //[GET] /trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multiMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
