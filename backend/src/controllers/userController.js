'use strict';
const Student = require('../models/userModel');
let BaseResponse = require('../../models/response').BaseResponse;

exports.findAll = function (req, res) {
  Student.findAll(function (err, student) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', student);
    return res.send(new BaseResponse(true, 200, student));
  });
};

exports.findById = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (err)
      res.send(err);
    return res.send(new BaseResponse(true, 200, student));
  });
};

exports.create = function (req, res) {
  const new_student = new Student(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Student.create(new_student, function (err, result) {
      if (err)
        res.send(err);
      const obj = {
        "_id": result,
        ...new_student
      }
      return res.send(new BaseResponse(true, 200, obj));
    });
  }
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Please provide all required field' });
  } else {
    Student.update(req.body.id, new Student(req.body), function (err, student) {
      if (err)
        res.send(err);
      return res.send(new BaseResponse(true, 200, student));
    });
  }
};

exports.delete = function (req, res) {
  Student.delete(req.query.id, function (err, student) {
    if (err)
      res.send(err);
    return res.send(new BaseResponse(true, 200));
  });
};