let BaseResponse = require('../../models/response').BaseResponse;
const { Student } = require('../../models/user');


const showUsers = async (req, res) => {
    let students = await Student.find({});
    res.render('user', {
        users: students
    });
};


const createUser = async (req, res) => {
    let user = await new Student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).save();
    return res.send(new BaseResponse(true, 200, user));
}

const updateUser = async (req, res) => {
    let id = req.body.id;
    let user = await Student.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    },
        {
            new: true
        }
    );
    return res.send(new BaseResponse(true, 200, user));
}


const deleteUser = async (req, res) => {
    await Student.findByIdAndDelete(req.query.id);
    return res.send(new BaseResponse(true, 200));
}

const getUser = async (req, res) => {
    let user = await Student.findById(req.query.id);
    return res.send(new BaseResponse(true, 200, user));
}

const getAllUsers = async (req, res) => {
    let users = await Student.find({});
    return res.send(new BaseResponse(true, 200, users));
}

module.exports = {
    showUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
}