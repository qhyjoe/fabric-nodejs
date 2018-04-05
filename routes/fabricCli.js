var express = require('express');
var router = express.Router();
var query = require('./query');
router.get('/query', function (req, res, next) {
    var data=query(req.query);
    console.log("query"+JSON.stringify(data))
    res.render('fabric', {title: JSON.stringify(data)});
});



module.exports = router;