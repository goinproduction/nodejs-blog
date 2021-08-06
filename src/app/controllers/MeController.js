const Course = require('../models/Course');
const { multiMongooseToObject } = require('../../utils/mongoose.js');
class MeController {
    //[GET] /stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: multiMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
