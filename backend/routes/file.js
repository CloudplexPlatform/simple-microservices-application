const express = require('express');
const router = express.Router();
let BaseResponse = require('../models/response').BaseResponse;
const fs = require('fs');


router.get('/show', (req, res) => {
    fs.readdir('./upload/', (err, files) => {
        res.render('file', {
            files
        });
    })
});

router.post('/upload', (req, res) => {
    let file = req.files.filename;
    filename = file.name;
    file.mv("./upload/" + filename, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send(new BaseResponse(true, 200));
        }

    })
})

router.get('/download/:filename', (req, res) => {
    var filename = req.params.filename;
    res.download('./upload/' + filename);
});



module.exports = router;