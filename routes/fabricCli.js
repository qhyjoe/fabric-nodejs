var express = require('express');
var router = express.Router();
var query = require('./query');
router.get('/query', function (req, res, next) {
    var id = req.query.id;
    var data=query(id);
    res.render('fabric', {title: JSON.stringify(data)});
});



module.exports = router;